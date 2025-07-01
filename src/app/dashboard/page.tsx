
import { Sidebar } from "../components/sidebar"
import { ContentSlider } from "../components/content-slider"

export default function SquadInterface() {
  return (
    <div className="min-h-screen bg-gray-100">
    <div className="flex">
        <Sidebar />
        <ContentSlider />
      </div>
    </div>
  )
}
