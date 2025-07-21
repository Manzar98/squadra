// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

export function createSupabaseClientWithToken(token: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  return createClient(url, key, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })
}


