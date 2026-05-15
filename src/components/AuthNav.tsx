'use client';

import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import { useEffect } from 'react';
import { isAuthEnabled } from '@/lib/auth/config';
import { useL } from './LangProvider';

/**
 * Sign-in / user button slot for the nav. Renders nothing when auth env vars
 * aren't configured — `AuthNavInner` is gated by `isAuthEnabled` so that its
 * `useUser()` call never fires without a `<ClerkProvider>` ancestor.
 *
 * On first sign-in we POST to /api/users/sync so the Clerk user gets a row
 * in the Supabase `public.users` table. The upsert is idempotent, so firing
 * it on every mount is safe.
 */
export function AuthNav() {
  if (!isAuthEnabled) return null;
  return <AuthNavInner />;
}

function AuthNavInner() {
  const { isLoaded, isSignedIn } = useUser();

  // Reserve space while Clerk initializes to avoid layout shift.
  if (!isLoaded) {
    return <div aria-hidden="true" style={{ width: 32, height: 32 }} />;
  }

  if (isSignedIn) {
    return (
      <>
        <UserSyncEffect />
        <UserButton
          appearance={{
            elements: { avatarBox: { width: 32, height: 32 } },
          }}
        />
      </>
    );
  }

  return (
    <SignInButton mode="modal">
      <button
        type="button"
        className="nav-link"
        style={{
          cursor: 'pointer',
          background: 'none',
          border: 'none',
          font: 'inherit',
          padding: 0,
        }}
      >
        <SignInLabel />
      </button>
    </SignInButton>
  );
}

function UserSyncEffect() {
  const { isLoaded, isSignedIn, user } = useUser();
  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return;
    void fetch('/api/users/sync', { method: 'POST' }).catch(() => {
      /* sync is best-effort — the row matters mostly for FK relations
         from the progress table. */
    });
  }, [isLoaded, isSignedIn, user]);
  return null;
}

function SignInLabel() {
  const L = useL();
  return <>{L('Sign in', 'Iniciar sesión', '登入', '登录')}</>;
}
