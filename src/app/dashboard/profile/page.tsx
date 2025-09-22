
import ProfileComponent from "@/app/components/profile-component"
import { Sidebar } from "../../components/sidebar"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-100">
    <div className="flex">
        <Sidebar />
        <ProfileComponent />
      </div>
    </div>
  )
}
