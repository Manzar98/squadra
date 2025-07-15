import { Sidebar } from "../../components/sidebar"
import MasteryZone from "@/app/components/mastery-zone"

export default function ChannelsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <Sidebar />
        <MasteryZone />
      </div>
    </div>
  )
}
