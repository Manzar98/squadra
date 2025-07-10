import { Sidebar } from "../../components/sidebar"
import Channels from "../../components/channels"

export default function ChannelsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <Sidebar />
        <Channels />
      </div>
    </div>
  )
}
