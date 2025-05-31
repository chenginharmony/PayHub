import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, serviceRoleKey);

async function seedAdmin() {
  // 1. Create the admin user if not exists
  const email = 'admin@payhub.com';
  const password = 'Admin123!';
  let userId: string | null = null;

  // Check if user exists
  const { data: existing, error: findError } = await supabase
    .from('profiles')
    .select('id')
    .eq('email', email)
    .single();

  if (existing && existing.id) {
    userId = existing.id;
  } else {
    // Create user via Auth API
    const { data: signUpData, error: signUpError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });
    if (signUpError) throw signUpError;
    userId = signUpData.user?.id;
  }

  // 2. Set role to 'admin' in profiles table
  if (userId) {
    await supabase.from('profiles').upsert({ id: userId, email, role: 'admin' }, { onConflict: ['id'] });
    console.log('Admin user seeded:', email);
  } else {
    throw new Error('Could not determine user id for admin');
  }
}

seedAdmin().catch(console.error);
