import { createClient, isSupabaseConfigured, LocalDataService } from './client';
import { Profile, UserRole } from '@/types';

export interface AuthResponse {
  success: boolean;
  user?: Profile | null;
  message?: string;
  error?: string;
}

/**
 * Sign up with email, password, full name, and role.
 * Integrates directly with Supabase Auth when configured, with seamless fallback.
 */
export async function signUpWithSupabase(
  email: string,
  password: string,
  fullName: string
): Promise<AuthResponse> {
  const supabase = createClient();
  const assignedRole: UserRole = 'student';

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: assignedRole,
          },
        },
      });

      if (error) {
        let msg = error.message;
        if (msg.toLowerCase().includes('rate limit') || msg.toLowerCase().includes('over_email_send_rate_limit')) {
          msg = 'Supabase Email Rate Limit Exceeded: Supabase limits test confirmation emails to 3-4 per hour. To fix this instantly, disable "Confirm email" in your Supabase Dashboard (Authentication -> Providers -> Email -> Toggle OFF "Confirm email").';
        }
        return {
          success: false,
          error: msg,
        };
      }

      if (data.user) {
        const newProfile: Profile = {
          id: data.user.id,
          email: data.user.email || email,
          full_name: fullName,
          avatar_url: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName)}`,
          role: assignedRole,
          created_at: new Date().toISOString(),
          subscription_status: 'none',
          admin_granted: false,
        };

        // Try upserting into public.profiles if table is created
        try {
          await supabase.from('profiles').upsert({
            id: newProfile.id,
            email: newProfile.email,
            full_name: newProfile.full_name,
            avatar_url: newProfile.avatar_url,
            role: assignedRole,
          });
        } catch {
          // Table might not be migrated yet; local state handles execution
        }

        LocalDataService.setCurrentUser(newProfile);
        window.dispatchEvent(new Event('storage'));

        return {
          success: true,
          user: newProfile,
          message: data.session
            ? 'Account created successfully as Student! Staff and administrative access can only be granted by the Super Administrator.'
            : 'Account registered! Please check your email to confirm registration.',
        };
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Signup failed';
      return { success: false, error: msg };
    }
  }

  // Fallback local persistence
  const fallbackProfile: Profile = {
    id: `usr_${Date.now()}`,
    email,
    full_name: fullName,
    avatar_url: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName)}`,
    role: assignedRole,
    created_at: new Date().toISOString(),
    subscription_status: 'none',
    admin_granted: false,
  };

  LocalDataService.setCurrentUser(fallbackProfile);
  window.dispatchEvent(new Event('storage'));

  return {
    success: true,
    user: fallbackProfile,
    message: 'Account created successfully as Student! Staff and administrative access can only be granted by the Super Administrator.',
  };
}

/**
 * Sign in with email and password.
 */
export async function signInWithSupabase(
  email: string,
  password: string
): Promise<AuthResponse> {
  const supabase = createClient();

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return {
          success: false,
          error: error.message,
        };
      }

      if (data.user) {
        // Fetch or build profile
        let userRole: UserRole = (data.user.user_metadata?.role as UserRole) || 'student';
        let fullName = data.user.user_metadata?.full_name || email.split('@')[0];
        let avatarUrl = data.user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName)}`;

        try {
          const { data: profileRow } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

          if (profileRow) {
            userRole = (profileRow.role as UserRole) || userRole;
            fullName = profileRow.full_name || fullName;
            avatarUrl = profileRow.avatar_url || avatarUrl;
          }
        } catch {
          // Ignore profile table query error
        }

        const profile: Profile = {
          id: data.user.id,
          email: data.user.email || email,
          full_name: fullName,
          avatar_url: avatarUrl,
          role: userRole,
          created_at: data.user.created_at || new Date().toISOString(),
          subscription_status: userRole === 'student' ? 'active' : 'active',
          admin_granted: true,
        };

        LocalDataService.setCurrentUser(profile);
        window.dispatchEvent(new Event('storage'));

        return {
          success: true,
          user: profile,
          message: 'Signed in successfully with Supabase!',
        };
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Sign in failed';
      return { success: false, error: msg };
    }
  }

  // Fallback for offline mode when Supabase is not reachable
  return {
    success: false,
    error: 'Invalid email or password. Please verify your credentials or register a new account.',
  };
}

/**
 * Sign out current session
 */
export async function signOutUser(): Promise<void> {
  const supabase = createClient();
  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('Supabase sign out error:', err);
    }
  }

  LocalDataService.logout();
  window.dispatchEvent(new Event('storage'));
}

/**
 * Sync Supabase session with local state
 */
export async function syncSupabaseSession(): Promise<Profile | null> {
  const supabase = createClient();
  if (!isSupabaseConfigured() || !supabase) {
    return LocalDataService.getCurrentUser();
  }

  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session || !session.user) {
      return LocalDataService.getCurrentUser();
    }

    const { user } = session;
    const existing = LocalDataService.getCurrentUser();
    if (existing && existing.id === user.id) {
      return existing;
    }

    const profile: Profile = {
      id: user.id,
      email: user.email || '',
      full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
      avatar_url: user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.email || 'U')}`,
      role: (user.user_metadata?.role as UserRole) || 'student',
      created_at: user.created_at || new Date().toISOString(),
      subscription_status: 'active',
      admin_granted: true,
    };

    LocalDataService.setCurrentUser(profile);
    window.dispatchEvent(new Event('storage'));
    return profile;
  } catch {
    return LocalDataService.getCurrentUser();
  }
}

/**
 * Send password reset email link
 */
export async function sendPasswordResetEmail(
  email: string,
  redirectTo?: string
): Promise<AuthResponse> {
  const supabase = createClient();

  if (isSupabaseConfigured() && supabase) {
    try {
      const targetRedirect = redirectTo || (typeof window !== 'undefined' ? `${window.location.origin}/auth?mode=reset` : undefined);
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: targetRedirect,
      });

      if (error) {
        let msg = error.message;
        if (msg.toLowerCase().includes('rate limit') || msg.toLowerCase().includes('over_email_send_rate_limit')) {
          msg = 'Email Rate Limit Exceeded: Supabase allows only 3-4 emails per hour on default SMTP. Please wait a few minutes or configure custom SMTP in Supabase Settings.';
        }
        return {
          success: false,
          error: msg,
        };
      }

      return {
        success: true,
        message: 'Password reset link sent! Check your inbox for instructions to reset your password.',
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Password reset request failed';
      return { success: false, error: msg };
    }
  }

  // Fallback demo/mock
  return {
    success: true,
    message: 'Demo Mode: Password reset link generated for ' + email,
  };
}

/**
 * Update user password (used during password recovery or while logged in)
 */
export async function updateUserPassword(
  newPassword: string
): Promise<AuthResponse> {
  const supabase = createClient();

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        return {
          success: false,
          error: error.message,
        };
      }

      return {
        success: true,
        message: 'Password updated successfully! You can now sign in with your new password.',
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update password';
      return { success: false, error: msg };
    }
  }

  return {
    success: true,
    message: 'Demo Mode: Password updated successfully.',
  };
}
