import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { getKeycloakConfig } from '@/lib/keycloak/config';

/**
 * Builds the Keycloak OIDC end_session_endpoint logout URL so signing out
 * terminates both the NextAuth session and the central Keycloak SSO session.
 */
export async function GET(req: NextRequest) {
  const kc = getKeycloakConfig();
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET || 'reactjav-school-nextauth-secret-key-2026',
  });

  const postLogoutRedirectUri =
    req.nextUrl.searchParams.get('redirect') ||
    process.env.NEXTAUTH_URL ||
    req.nextUrl.origin;

  const logoutUrl = new URL(`${kc.issuer}/protocol/openid-connect/logout`);
  logoutUrl.searchParams.set('post_logout_redirect_uri', postLogoutRedirectUri);
  logoutUrl.searchParams.set('client_id', kc.clientId);

  if (token?.idToken) {
    logoutUrl.searchParams.set('id_token_hint', String(token.idToken));
  }

  return NextResponse.json({
    success: true,
    logoutUrl: logoutUrl.toString(),
  });
}

