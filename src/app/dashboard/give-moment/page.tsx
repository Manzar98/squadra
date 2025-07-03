
import CaptureAMoment from "@/app/components/caputre-moment"
import { Sidebar } from "../../components/sidebar"

export default function MomentPage() {
  return (
    <div className="min-h-screen bg-gray-100">
    <div className="flex">
        <Sidebar />
        <CaptureAMoment />
      </div>
    </div>
  )
}
