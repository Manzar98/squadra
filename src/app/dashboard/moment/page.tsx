
import { Sidebar } from "../../components/sidebar"
import { WelcomeSlider } from "../../components/welcome-slider"

export default function MomentPage() {
  return (
    <div className="min-h-screen bg-gray-100">
    <div className="flex">
        <Sidebar />
        <WelcomeSlider />
      </div>
    </div>
  )
}
