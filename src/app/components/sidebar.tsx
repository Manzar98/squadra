"use client"
import Image from "next/image"
import { Button } from "../components/ui/button"
import { useRouter } from "next/navigation"

export function Sidebar() {
  const router = useRouter()

  const handleGiveAMoment = () => {
    router.push("/dashboard/give-moment")
  }

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 pb-4">
        <Image
          src="/logo.png"
          alt="Squad Logo"
          className="h-[32px] w-auto"
          width={120}
          height={32}
          priority
        />
      </div>

      {/* Give a moment button */}
      <div className="px-6 pb-6">
        <Button className="w-full bg-green-500 hover:bg-green-600 text-black rounded-full font-bold text-[14px] tracking-[0.75px]" onClick={handleGiveAMoment}>
          GIVE A MOMENT
        </Button>
      </div>

      {/* Navigation */}
      <div className="px-6 space-y-6 flex-1">
        <div className="flex items-center justify-between text-gray-400 text-[18px] font-body font-[500]" >
          <span>Your flow zones</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <div className="flex items-center justify-between text-gray-400  text-[18px] font-body font-[500]">
          <span>Squad channel</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>

        {/* Illustration */}
        <div className="w-[204px] h-[339px] bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mt-[100px]">
          {/* Image section */}
          <div className="w-full h-[139px] relative">
            <Image
              src="/sideimage.png"
              alt="Invite Squadmates illustration"
              className="w-full h-full object-cover"
              fill
              sizes="204px"
              priority
            />
          </div>

          {/* Text content */}
          <div className="p-4 space-y-3">
            <h3 className="text-lg font-bold text-gray-900 leading-tight">
              Invite
              <br />
              Squadmates
            </h3>

            <p className="text-xs text-gray-600 leading-relaxed">
              Squadra works best when you have all your teammates on the app.
            </p>

            <button className="text-green-600 font-bold text-xs hover:text-green-700 transition-colors flex items-center gap-1 mt-4">
              START INVITING 🚀
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
