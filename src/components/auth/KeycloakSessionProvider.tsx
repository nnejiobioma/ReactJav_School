'use client';

import React, { useEffect, useRef } from 'react';
import { SessionProvider, useSession } from 'next-auth/react';
import { LocalDataService } from '@/lib/supabase/client';
import { Profile, UserRole, ROLE_PRIVILEGES } from '@/types';
import { acceptCookies } from '@/lib/cookies';

function KeycloakSessionSynchronizer() {
  const { data: session, status } = useSession();
  const lastSyncedKeyRef = useRef<string | null>(null);

  useEffect(() => {
    if (status !== 'authenticated' || !session?.user) {
      return;
    }

    const kcUser = session.user as {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: UserRole;
      keycloakRoles?: string[];
    };

    const cleanEmail = (kcUser.email || '').trim().toLowerCase();
    if (!cleanEmail && !kcUser.id) return;

    const resolvedRole: UserRole = kcUser.role || 'student';
    const syncKey = `${kcUser.id || cleanEmail}:${resolvedRole}:${kcUser.name || ''}`;
    if (lastSyncedKeyRef.current === syncKey) {
      return;
    }
    lastSyncedKeyRef.current = syncKey;

    const syncKeycloakProfile = async () => {
      try {
        await LocalDataService.syncFromServer();
      } catch {}

      const dbProfile = await LocalDataService.getProfileByEmailOrId(cleanEmail, kcUser.id);
      const localProfile = LocalDataService.getAllProfiles().find(
        (p) =>
          (kcUser.id && p.id === kcUser.id) ||
          (cleanEmail && p.email && p.email.toLowerCase() === cleanEmail)
      );
      const existing = dbProfile || localProfile;
      const timestamp = new Date().toISOString();
      const fullName =
        kcUser.name ||
        existing?.full_name ||
        (cleanEmail ? cleanEmail.split('@')[0] : 'Scholar');

      const avatarUrl =
        existing?.avatar_url ||
        kcUser.image ||
        `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName)}`;

      // Keycloak is the authoritative source of truth for `role` and `privileges`,
      // while existing database/local records provide academic and subscription state.
      const mergedProfile: Profile = {
        ...existing,
        id: existing?.id || kcUser.id || `kc_${Date.now()}`,
        email: cleanEmail || existing?.email || '',
        full_name: fullName,
        avatar_url: avatarUrl,
        role: resolvedRole,
        privileges: ROLE_PRIVILEGES[resolvedRole] || ROLE_PRIVILEGES.student,
        created_at: existing?.created_at || timestamp,
        subscription_status:
          existing?.subscription_status ||
          (resolvedRole !== 'student' ? 'active' : 'none'),
        admin_granted:
          existing?.admin_granted !== undefined
            ? existing.admin_granted
            : resolvedRole !== 'student',
        registration_completed:
          existing?.registration_completed !== undefined
            ? existing.registration_completed
            : resolvedRole !== 'student',
        privacy_accepted:
          existing?.privacy_accepted !== undefined
            ? existing.privacy_accepted
            : true,
        privacy_accepted_at: existing?.privacy_accepted_at || timestamp,
        terms_accepted:
          existing?.terms_accepted !== undefined ? existing.terms_accepted : true,
        terms_accepted_at: existing?.terms_accepted_at || timestamp,
      };

      acceptCookies(true);
      await LocalDataService.syncProfileToSupabaseAndLocal(mergedProfile);
      window.dispatchEvent(new Event('storage'));
    };

    syncKeycloakProfile();
  }, [session, status]);

  return null;
}

export default function KeycloakSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <KeycloakSessionSynchronizer />
      {children}
    </SessionProvider>
  );
}

