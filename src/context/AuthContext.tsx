import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isConfigured: boolean;
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  updatePassword: (newPassword: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const configured = isSupabaseConfigured();

  useEffect(() => {
    if (!configured) {
      if (localStorage.getItem('varun_portfolio_admin_preview') === 'true') {
        const mockUser: any = {
          id: 'local-admin-varun',
          email: 'ux.varunsurya@gmail.com',
          user_metadata: { full_name: 'Varun Surya' },
        };
        setUser(mockUser);
        setSession({ user: mockUser } as any);
      }
      setIsLoading(false);
      return;
    }

    // 1. Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    }).catch((err) => {
      console.warn('Error fetching Supabase session:', err);
      setIsLoading(false);
    });

    // 2. Listen to auth state transitions
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [configured]);

  const signIn = async (email: string, password: string, rememberMe: boolean = true) => {
    if (!configured) {
      // Local preview mode when Supabase credentials are not yet entered in .env
      const normalizedEmail = email.trim().toLowerCase();
      if (
        (normalizedEmail === 'ux.varunsurya@gmail.com' || normalizedEmail === 'admin@varunsurya.design' || normalizedEmail === 'admin') &&
        (password === 'admin123' || password === 'admin')
      ) {
        const mockUser: any = {
          id: 'local-admin-varun',
          email: normalizedEmail === 'admin' ? 'ux.varunsurya@gmail.com' : normalizedEmail,
          user_metadata: { full_name: 'Varun Surya' },
        };
        setUser(mockUser);
        setSession({ user: mockUser } as any);
        if (rememberMe) {
          localStorage.setItem('varun_portfolio_admin_preview', 'true');
        }
        return { success: true };
      }

      return {
        success: false,
        error: 'Demo credentials for local preview: Email: ux.varunsurya@gmail.com | Password: admin123',
      };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      // If user chose not to remember, set session duration / cleanup on tab close
      if (!rememberMe) {
        sessionStorage.setItem('varun_portfolio_admin_temp_session', 'true');
      } else {
        sessionStorage.removeItem('varun_portfolio_admin_temp_session');
      }

      setUser(data.user);
      setSession(data.session);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'An unexpected error occurred during sign in.' };
    }
  };

  const signOut = async () => {
    if (configured) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setSession(null);
    localStorage.removeItem('varun_portfolio_admin_preview');
    sessionStorage.removeItem('varun_portfolio_admin_temp_session');
  };

  const resetPassword = async (email: string) => {
    if (!configured) {
      return { success: false, error: 'Supabase is not configured yet.' };
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to send password reset email.' };
    }
  };

  const updatePassword = async (newPassword: string) => {
    if (!configured) {
      return { success: false, error: 'Supabase is not configured yet.' };
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to update password.' };
    }
  };

  const value = useMemo(() => ({
    user,
    session,
    isLoading,
    isAuthenticated: Boolean(user),
    isConfigured: configured,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
  }), [user, session, isLoading, configured]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

