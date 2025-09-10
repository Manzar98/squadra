import { requireAuth } from '@/lib/supabase/auth/utils'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // This will redirect to login if user is not authenticated
  await requireAuth()
  
  return <>{children}</>
}
