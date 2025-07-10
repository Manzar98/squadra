"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Medal, MessagesSquare, Menu, X } from "lucide-react"
import Image from "next/image"
import { Button } from "../components/ui/button"

export function Sidebar() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleGiveAMoment = () => {
    router.push("/dashboard/give-moment")
    setIsOpen(false) // Close sidebar on mobile
  }

  return (
    <>
      {/* Hamburger Bar (mobile/tablet only) */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white py-4 px-4 shadow-md lg:hidden flex items-center justify-between">
        <button onClick={() => setIsOpen(true)} className="text-black">
          <Menu className="w-8 h-8" />
        </button>
        {/* <span className="text-sm font-semibold text-gray-700 tracking-wide">Navigation</span> */}
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
        />
      )}

      {/* Sidebar Panel */}
      <div
        className={`bg-white border-r border-gray-200 flex flex-col z-40
          fixed top-16 left-0 transform transition-transform duration-300
          w-[85vw] max-w-[280px] h-[calc(100dvh-64px)]
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:top-0 lg:translate-x-0 lg:static lg:w-[14vw] lg:h-screen lg:transform-none`}
      >
        {/* Close Button (mobile only) */}
        <button
          className="absolute top-4 right-4 text-gray-600 lg:hidden z-50"
          onClick={() => setIsOpen(false)}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Logo */}
        <div className="mt-4 pt-4 px-4 mb-8 lg:mt-0 lg:pt-5 lg:px-6 lg:mb-11">
          <Image
            src="/logo.png"
            alt="Squad Logo"
            width={164}
            height={40}
            priority
            className="w-[120px] h-auto lg:w-[164px]"
          />
        </div>

        {/* Give a Moment Button */}
        <div className="px-4 mb-6 lg:px-4 lg:mb-8.5">
          <Button
            className="w-full h-10 text-sm lg:h-12 lg:text-base bg-green-500 hover:bg-green-600 text-black rounded-full font-bold tracking-wide"
            onClick={handleGiveAMoment}
          >
            GIVE A MOMENT
          </Button>
        </div>

        {/* Navigation Links */}
        <div className="px-4 flex-1 space-y-6 lg:space-y-10">
          <div className="flex items-center justify-between text-sm lg:text-lg font-medium tracking-wide hover:text-green-500">
            <span>Your flow zones</span>
            <Medal className="w-5 h-5 lg:w-6 lg:h-6 text-black" />
          </div>

          <a
            href="/dashboard/channels"
            className="flex items-center justify-between text-sm lg:text-lg font-medium tracking-wide hover:text-green-500 transition-colors"
          >
            <span>Squad channel</span>
            <MessagesSquare className="w-5 h-5 lg:w-6 lg:h-6 text-black" />
          </a>

          {/* Invite Squadmates Section */}
          <div className="w-full rounded-xl border border-gray-200 shadow-sm overflow-hidden mt-10 lg:mt-16.5">
            <div className="w-full h-[120px] relative lg:h-[139px]">
              <Image
                src="/sideimage.png"
                alt="Invite Squadmates illustration"
                className="w-full h-full object-cover"
                fill
                priority
              />
            </div>

            <div className="px-4 pt-4 lg:pt-5.5 space-y-2 lg:space-y-3">
              <h6 className="text-base lg:text-[1.3rem] font-bold text-black leading-tight">
                Invite
                <br />
                Squadmates
              </h6>
              <p className="text-xs lg:text-sm text-[#00000099] font-normal">
                Squadra works best when you have all your teammates on the app.
              </p>
              <button className="text-green-600 font-bold text-xs lg:text-sm hover:text-green-700 flex items-center gap-1 mt-3 mb-2 transition-colors">
                START INVITING 🚀
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
