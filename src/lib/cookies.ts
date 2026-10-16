/**
 * ReactJav LMS Cookie Management Utilities
 * Supports GDPR, ePrivacy Directive, and CCPA Compliant Cookie Management
 */

export const COOKIE_KEYS = {
  CONSENT: 'reactjav_cookie_consent',
  CONSENT_CATEGORIES: 'reactjav_cookie_preferences',
  SESSION: 'reactjav_session_token',
  THEME: 'app-theme',
  PRIVACY_ACCEPTED: 'reactjav_privacy_accepted',
} as const;

export interface CookiePreferences {
  essential: boolean;
  functional: boolean;
  analytics: boolean;
  timestamp: string;
}

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
  }
  return null;
}

export function setCookie(name: string, value: string, days = 365, path = '/'): void {
  if (typeof document === 'undefined') return;
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  const secure = typeof window !== 'undefined' && window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=${path}; SameSite=Lax${secure}`;
}

export function removeCookie(name: string, path = '/'): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}; SameSite=Lax`;
}

export function hasAcceptedCookies(): boolean {
  if (typeof window === 'undefined') return true;
  const consentCookie = getCookie(COOKIE_KEYS.CONSENT);
  if (consentCookie === 'accepted' || consentCookie === 'essential') return true;
  const storedConsent = localStorage.getItem(COOKIE_KEYS.CONSENT);
  return storedConsent === 'accepted' || storedConsent === 'essential';
}

export function acceptCookies(all = true): void {
  const status = all ? 'accepted' : 'essential';
  const prefs: CookiePreferences = {
    essential: true,
    functional: all,
    analytics: all,
    timestamp: new Date().toISOString(),
  };

  setCookie(COOKIE_KEYS.CONSENT, status, 365);
  setCookie(COOKIE_KEYS.CONSENT_CATEGORIES, JSON.stringify(prefs), 365);

  if (typeof window !== 'undefined') {
    localStorage.setItem(COOKIE_KEYS.CONSENT, status);
    localStorage.setItem(COOKIE_KEYS.CONSENT_CATEGORIES, JSON.stringify(prefs));
    window.dispatchEvent(new Event('cookie_consent_updated'));
  }
}
