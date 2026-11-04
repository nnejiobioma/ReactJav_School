import type { NextAuthOptions } from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';
import { getKeycloakConfig, resolveKeycloakRolesAndUserRole } from './config';

/**
 * Refreshes an expired Keycloak access token using the refresh_token grant
 */
async function refreshKeycloakAccessToken(token: Record<string, any>) {
  try {
    const kc = getKeycloakConfig();
    const tokenEndpoint = `${kc.issuer}/protocol/openid-connect/token`;

    const params = new URLSearchParams({
      client_id: kc.clientId,
      client_secret: kc.clientSecret,
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken as string,
    });

    const response = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    const refreshed = await response.json();
    if (!response.ok) {
      throw refreshed;
    }

    const { role, keycloakRoles, privileges } = resolveKeycloakRolesAndUserRole(
      null,
      refreshed.access_token,
      kc.clientId
    );

    return {
      ...token,
      accessToken: refreshed.access_token,
      idToken: refreshed.id_token ?? token.idToken,
      expiresAt: Math.floor(Date.now() / 1000) + (refreshed.expires_in || 300),
      refreshToken: refreshed.refresh_token ?? token.refreshToken,
      role,
      keycloakRoles,
      privileges,
      error: undefined,
    };
  } catch (error) {
    console.warn('[Keycloak NextAuth] Failed to refresh access token:', error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: getKeycloakConfig().clientId,
      clientSecret: getKeycloakConfig().clientSecret,
      issuer: getKeycloakConfig().issuer,
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/auth',
    error: '/auth',
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      const kc = getKeycloakConfig();

      // Initial sign-in from Keycloak OIDC callback
      if (account) {
        const { role, keycloakRoles, privileges } = resolveKeycloakRolesAndUserRole(
          profile as Record<string, any>,
          account.access_token,
          kc.clientId
        );

        return {
          ...token,
          accessToken: account.access_token,
          idToken: account.id_token,
          refreshToken: account.refresh_token,
          expiresAt: account.expires_at || Math.floor(Date.now() / 1000) + 300,
          keycloakSub: account.providerAccountId || (profile as any)?.sub || token.sub,
          role,
          keycloakRoles,
          privileges,
        };
      }

      // Return current token if it has not expired yet (with 30s buffer)
      if (token.expiresAt && Date.now() < ((token.expiresAt as number) - 30) * 1000) {
        return token;
      }

      // Access token expired — refresh via Keycloak token endpoint
      if (token.refreshToken) {
        return await refreshKeycloakAccessToken(token);
      }

      return token;
    },

    async session({ session, token }) {
      const resolvedRole = (token.role as string) || 'student';
      return {
        ...session,
        user: {
          ...session.user,
          id: (token.keycloakSub as string) || (token.sub as string) || '',
          role: resolvedRole,
          keycloakRoles: (token.keycloakRoles as string[]) || [resolvedRole],
          privileges: (token.privileges as string[]) || [],
        } as any,
        accessToken: token.accessToken,
        idToken: token.idToken,
        error: token.error,
      } as any;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'reactjav-school-nextauth-secret-key-2026',
};

