import { createClient, SupabaseClient } from '@supabase/supabase-js'

export const getSupabaseAdmin = (): SupabaseClient => {
  const url = process.env.SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url) throw new Error('SUPABASE_URL not set')
  if (!serviceRoleKey) throw new Error('SUPABASE_SERVICE_ROLE_KEY not set')
  return createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}
