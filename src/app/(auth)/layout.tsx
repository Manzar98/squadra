import { requireNoAuth } from '@/lib/supabase/auth/utils'

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // This will redirect to dashboard if user is already authenticated
  await requireNoAuth()
  
  return <>{children}</>
}
