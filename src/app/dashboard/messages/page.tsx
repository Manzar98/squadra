import ChatRoom from "@/app/components/chat-room"
import { Sidebar } from "../../components/sidebar"

export default function ChannelsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <Sidebar />
        <ChatRoom />
      </div>
    </div>
  )
}
