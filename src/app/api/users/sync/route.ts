import { auth, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { isAuthEnabled } from '@/lib/auth/config';
import { createSupabaseAdminClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

/**
 * POST /api/users/sync
 *
 * Idempotent: upserts the currently signed-in Clerk user into
 * `public.users` so progress and other relations have a row to FK to.
 * Called from <AuthNav /> on every sign-in via a useEffect — first sign-in
 * creates the row, subsequent sign-ins are no-ops (the email gets refreshed
 * if Clerk has a newer primary email).
 */
export async function POST() {
  if (!isAuthEnabled) {
    return NextResponse.json({ error: 'auth_not_configured' }, { status: 503 });
  }

  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: 'user_not_found' }, { status: 404 });
  }

  const email = user.emailAddresses[0]?.emailAddress;
  if (!email) {
    return NextResponse.json({ error: 'no_email' }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from('users')
    .upsert(
      { id: userId, email, updated_at: new Date().toISOString() },
      { onConflict: 'id' }
    );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
