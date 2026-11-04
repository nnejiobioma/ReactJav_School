import { UserRole, Privilege, ROLE_PRIVILEGES } from '@/types';

export interface KeycloakEnvConfig {
  issuer: string;
  clientId: string;
  clientSecret: string;
  realm: string;
  baseUrl: string;
  adminConsoleUrl: string;
  isConfigured: boolean;
}

/**
 * Returns Keycloak configuration from environment variables with sensible local defaults
 * matching docker-compose.yml and keycloak/reactjav-school-realm.json.
 */
export function getKeycloakConfig(): KeycloakEnvConfig {
  const baseUrl = (
    process.env.NEXT_PUBLIC_KEYCLOAK_URL ||
    process.env.KEYCLOAK_URL ||
    'http://localhost:8080'
  ).replace(/\/$/, '');

  const realm =
    process.env.NEXT_PUBLIC_KEYCLOAK_REALM ||
    process.env.KEYCLOAK_REALM ||
    'reactjav-school';

  const issuer = (
    process.env.KEYCLOAK_ISSUER ||
    process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER ||
    `${baseUrl}/realms/${realm}`
  ).replace(/\/$/, '');

  const clientId =
    process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID ||
    process.env.KEYCLOAK_CLIENT_ID ||
    'reactjav-web';

  const clientSecret =
    process.env.KEYCLOAK_CLIENT_SECRET ||
    'reactjav-keycloak-secret-2026';

  const adminConsoleUrl = `${baseUrl}/admin/${realm}/console`;

  return {
    issuer,
    clientId,
    clientSecret,
    realm,
    baseUrl,
    adminConsoleUrl,
    isConfigured: Boolean(issuer && clientId),
  };
}

/**
 * Decodes a JWT payload safely without external dependencies
 */
export function decodeJwtPayload(token?: string): Record<string, any> | null {
  if (!token) return null;
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload =
      typeof window !== 'undefined'
        ? decodeURIComponent(
            atob(base64)
              .split('')
              .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
              .join('')
          )
        : Buffer.from(base64, 'base64').toString('utf-8');
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

/**
 * Extracts all realm and client roles from Keycloak token claims / profile
 * and resolves the highest-precedence ReactJav UserRole.
 */
export function resolveKeycloakRolesAndUserRole(
  claimsOrProfile?: Record<string, any> | null,
  accessToken?: string,
  clientId: string = 'reactjav-web'
): {
  role: UserRole;
  keycloakRoles: string[];
  privileges: Privilege[];
} {
  const roleSet = new Set<string>();

  const collectFromObject = (obj?: Record<string, any> | null) => {
    if (!obj) return;

    // 1. Standard Keycloak realm_access.roles
    if (Array.isArray(obj.realm_access?.roles)) {
      obj.realm_access.roles.forEach((r: string) => roleSet.add(r.toLowerCase()));
    }

    // 2. Flattened realm_access.roles mapper (when claim name is "realm_access.roles")
    if (Array.isArray(obj['realm_access.roles'])) {
      obj['realm_access.roles'].forEach((r: string) => roleSet.add(r.toLowerCase()));
    }

    // 3. Standard Keycloak resource_access[clientId].roles
    if (obj.resource_access && typeof obj.resource_access === 'object') {
      Object.values(obj.resource_access).forEach((resource: any) => {
        if (Array.isArray(resource?.roles)) {
          resource.roles.forEach((r: string) => roleSet.add(r.toLowerCase()));
        }
      });
    }

    // 4. Direct roles array or role string if configured via custom mapper
    if (Array.isArray(obj.roles)) {
      obj.roles.forEach((r: string) => roleSet.add(String(r).toLowerCase()));
    }
    if (typeof obj.role === 'string') {
      roleSet.add(obj.role.toLowerCase());
    }
  };

  collectFromObject(claimsOrProfile);
  if (accessToken) {
    collectFromObject(decodeJwtPayload(accessToken));
  }

  const keycloakRoles = Array.from(roleSet);

  // Precedence: super_admin > admin > instructor > student
  let resolvedRole: UserRole = 'student';
  if (roleSet.has('super_admin') || roleSet.has('super-admin') || roleSet.has('superadmin')) {
    resolvedRole = 'super_admin';
  } else if (roleSet.has('admin') || roleSet.has('administrator')) {
    resolvedRole = 'admin';
  } else if (roleSet.has('instructor') || roleSet.has('faculty') || roleSet.has('teacher')) {
    resolvedRole = 'instructor';
  }

  return {
    role: resolvedRole,
    keycloakRoles,
    privileges: ROLE_PRIVILEGES[resolvedRole] || ROLE_PRIVILEGES.student,
  };
}

