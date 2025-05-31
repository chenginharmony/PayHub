import { supabase } from './supabaseClient';

export async function getUserRole(userId: string): Promise<string | null> {
  // Assumes a 'profiles' table with a 'role' column exists in Supabase
  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single();
  if (error) return null;
  return data?.role || null;
}

export function isAdmin(role: string) {
  return role === 'admin' || role === 'superadmin';
}

export function isFreelancer(role: string) {
  return role === 'freelancer';
}

export function isClient(role: string) {
  return role === 'client';
}
