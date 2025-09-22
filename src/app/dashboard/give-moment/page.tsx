
import CaptureAMoment from "@/app/components/caputre-moment"
import { Sidebar } from "../../components/sidebar"
import { getUser } from "@/lib/supabase/auth/utils"

export default async function MomentPage() {
  const user = await getUser()
  const userId = user?.id

  return (
    <div className="min-h-screen bg-gray-100">
    <div className="flex">
        <Sidebar />
        <CaptureAMoment userId={userId ?? undefined} />
      </div>
    </div>
  )
}
