'use client';

import { signIn, signOut, getSession } from 'next-auth/react';

/**
 * Initiates the OIDC Authorization Code login flow with Keycloak via NextAuth.
 */
export async function signInWithKeycloak(callbackUrl: string = '/dashboard') {
  return await signIn('keycloak', { callbackUrl });
}

/**
 * Signs out of NextAuth and clears the Keycloak SSO session if active.
 */
export async function signOutFromKeycloak(): Promise<void> {
  try {
    const session = await getSession();
    if (session) {
      await signOut({ redirect: false });
    }
  } catch (err) {
    console.warn('[Keycloak Client] Sign out notice:', err);
  }
}

/**
 * Returns the Keycloak Admin Console URL for managing users and role assignments.
 */
export function getKeycloakAdminConsoleUrl(): string {
  const baseUrl = (
    process.env.NEXT_PUBLIC_KEYCLOAK_URL || 'http://localhost:8080'
  ).replace(/\/$/, '');
  const realm = process.env.NEXT_PUBLIC_KEYCLOAK_REALM || 'reactjav-school';
  return `${baseUrl}/admin/${realm}/console`;
}

