"use client"

import { Button } from "../components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Badge } from "../components/ui/badge"
import { Input } from "../components/ui/input"
import { Heart, Users, Eye, Info, Mountain, MessageSquareCode, IceCream, MessageSquare } from "lucide-react"
import React, { useState } from "react";
import Image from "next/image"
import ProfileDropDownMenu from "./profile-dropdown-menu"

// Simple Tooltip component
function Tooltip({ children, text }: { children: React.ReactNode; text: string }) {
  return (
    <div className="relative group flex items-center font-body">
      {children}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10 opacity-0 group-hover:opacity-100 pointer-events-none transition bg-[#2B2C2B] text-white text-sm rounded px-2 py-1 whitespace-nowrap">
        {text}
      </div>
    </div>
  )
}

export default function Channels() {
  const [showAll, setShowAll] = useState(false);

  // Example avatar data for tooltips
  const signatureZoneAvatars = [
    { src: "/thumb1.jpg", name: "Bugs Bunny" },
    { src: "/thumb2.jpg", name: "Daffy Duck" },
    { src: "/thumb3.jpg", name: "Yosemite Sam" },
    { src: "/thumb4.jpg", name: "Porky Pig" },
  ]

  const communicationAvatars = [
    { src: "/thumb1.jpg", name: "Bugs Bunny" },
  ]

  const collaborationAvatars = [
    { src: "/thumb7.jpg", name: "Tweety" },
  ]

  // For the grid of 12 avatars, just use generic names for demo
  const gridAvatars = Array.from({ length: 12 }, (_, i) => ({
    src: `/thumb${i + 1}.jpg`,
    name: `User ${i + 1}`,
  }))

  const comments = [
    {
      name: "Bugs Bunny",
      text: "Donut donut chupa chups. Sesame snaps caramels bear claw pie. Donut donut apple pie lemon drops.",
    },
    {
      name: "Lola Bunny",
      text: "Brownie jelly beans. Croissant tart sweet roll. Cupcake tootsie roll bear claw.",
    },
    {
      name: "Elmer Fudd",
      text: "Gingerbread soufflé. Jelly-o lemon drops. Danish toffee sweet roll.",
    },
    {
      name: "Tweety Bird",
      text: "Candy canes lollipop. Muffin chocolate bar. Cheesecake apple pie.",
    },
    {
      name: "Sylvester",
      text: "Macaroon tiramisu. Carrot cake bonbon. Donut jelly beans.",
    },
  ];

  return (
    <div className="flex flex-1 flex-col bg-[#F5F6F5]">
      <div className="px-2 sm:px-4 lg:px-6 pt-2 sm:pt-4.5">
        <div className="mt-14 lg:mt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-8 lg:mb-10.5 fixed-header">
          <div className="flex items-center gap-2 sm:gap-4">
            <h4 className="text-lg sm:text-2xl lg:text-[34px] font-semibold text-gray-900">Looney Tunes&#39; channel</h4>
          </div>
          {/* add Profile dropdown here */}
          <div className="hidden lg:flex">
            <ProfileDropDownMenu />
          </div>
        </div>

        <div className="flex w-full">
          <div className="flex-1 w-full pb-2 sm:pb-4 lg:pb-6 space-y-3 sm:space-y-4 lg:space-y-6 main-content">
            {/* First Post */}
            <div className="w-full bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex gap-4">
                  <Tooltip text="Bugs Bunny">
                    <Avatar className="w-15 h-15">
                      <AvatarImage src="/thumb1.jpg" />
                      <AvatarFallback className="bg-yellow-400 text-white font-semibold">BB</AvatarFallback>
                    </Avatar>
                  </Tooltip>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold text-black font-body text-lg">Bugs Bunny</span>
                      <span className="text-black text-lg">noticed a Moment</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2 font-body">
                      <span className="text-black text-lg">by</span>
                      <span className="font-bold text-black text-lg">Yosemite Sam</span>
                      <span className="text-[#494949] text-xs">2 days ago</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge className="bg-[#DDDEDD] text-[#494949] text-sm py-3.5 px-4 font-medium tracking-[0.1px] flex items-center mb-0">
                    <Users className="w-4 h-4 mr-2" />
                    Collaboration
                  </Badge>
                </div>
              </div>


              <div className="mb-6">
                <div className="flex items-center gap-1 mb-4">
                  <span className="text-lg">✌️</span>
                  <span className="text-xl font-bold text-[#5B5C5B] tracking-[0.12px] font-body">You awesomed all over the place!!</span>
                </div>
                <p className="text-[#494949] leading-relaxed text-lg font-body font-[500] tracking-[0.5px]">
                  Greyhound divisively hello coldly wonderfully marginally far upon. And then the Greyhound divisively
                  hello coldly wonderfully marginally far upon. The open Greyhound divisively hello coldly wonderfully
                  marginally far upon.
                </p>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Heart className="w-7.5 h-7.5 text-[#2B2C2B]" />
                  <span className="text-xl font-semibold font-body">12</span>
                </div>
              </div>

              <div className="flex gap-3 border-t border-[#A3A4A3] pt-4">
                <Input placeholder="Write a comment about this Moment..." className="pl-3 sm:pl-4 py-2.5 sm:py-3 font-body h-10 sm:h-12 lg:h-[55%] text-sm sm:text-base" />
                <Button variant="ghost" className="text-sm font-bold text-[#C9CAC9] tracking-[0.75px]">
                  SEND
                </Button>
              </div>
            </div>
            {/* Second Post */}
            <div className="w-full bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex gap-4">
                  <Tooltip text="Shaw Shank">
                    <Avatar className="w-15 h-15">
                      <AvatarImage src="/thumb7.jpg" />
                      <AvatarFallback className="bg-yellow-400 text-white font-semibold">BB</AvatarFallback>
                    </Avatar>
                  </Tooltip>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold text-black font-body text-lg">Yosemite Sam</span>
                      <span className="text-black text-lg">noticed a Moment</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2 font-body">
                      <span className="text-black text-lg">by</span>
                      <span className="font-bold text-black text-lg">Daffy Duck</span>
                      <span className="text-[#494949] text-xs">2 days ago</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge className="bg-[#DDDEDD] text-[#494949] text-sm py-3.5 px-4 font-medium tracking-[0.1px] flex items-center mb-0">
                    <Mountain className="w-4 h-4 mr-2" />
                    Purpose Driven
                  </Badge>
                </div>
              </div>


              <div className="mb-6">
                <div className="flex items-center gap-1 mb-4">
                  <span className="text-lg">💯</span>
                  <span className="text-xl font-bold text-[#5B5C5B] tracking-[0.12px] font-body">Couldn&apos;t have done it better myself</span>
                </div>
                <p className="text-[#494949] leading-relaxed text-lg font-body font-[500] tracking-[0.5px]">
                  Tiramisu pastry chocolate. Danish muffin macaroon. Fruitcake marzipan pastry cheesecake jelly-o carrot
                  cake. Cake liquorice toffee sweet icing macaroon pudding.
                </p>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <Heart className="w-7.5 h-7.5 text-[#2B2C2B]" />
                  <span className="text-xl font-semibold font-body">1</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-7.5 h-7.5 text-green-400" />
                  <span className="text-xl font-semibold font-body">1</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-[#A3A4A3] pt-4">
                {/* Comment section */}
                <div className="flex items-start gap-4">
                  <Tooltip text="Bugs Bunny">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback className="bg-yellow-400 text-white font-semibold">BB</AvatarFallback>
                    </Avatar>
                  </Tooltip>

                  <div className="flex-1">
                    {comments.slice(0, showAll ? comments.length : 1).map((comment, idx) => (
                      <div key={idx} className="bg-green-50 p-4 rounded-xl border border-green-100 mb-2">
                        <p className="font-semibold mb-1 text-black font-body">{comment.name}</p>
                        <p className="text-[#5B5C5B] text-sm leading-relaxed tracking-[0.1px]">
                          {comment.text}
                        </p>
                      </div>
                    ))}
                    {!showAll && (
                      <a
                        href="#"
                        className="text-green-700 text-sm font-semibold hover:underline font-body"
                        onClick={e => {
                          e.preventDefault();
                          setShowAll(true);
                        }}
                      >
                        View 4 more Comments
                      </a>
                    )}
                  </div>
                </div>
                {/* Input + Button row */}
                <div className="flex items-center gap-3 ml-14">
                  <Input
                    placeholder="Write a comment about this Moment..."
                    className="flex-1 pl-3 sm:pl-4 py-2.5 sm:py-3 font-body h-10 sm:h-12 lg:h-[55%] text-sm sm:text-base"
                  />
                  <button
                    className="text-sm font-bold text-green-600 tracking-[0.75px] !bg-none"
                  >
                    SEND
                  </button>
                </div>
              </div>
            </div>
            {/* Third Post */}
            <div className="bg-white rounded-lg border border-gray-200 p-2 sm:p-4 lg:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between shadow-sm mt-3 sm:mt-4 lg:mt-6">
              <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
                <Avatar className="w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24">
                  <AvatarImage src="/thumb1.jpg" />
                  <AvatarFallback className="bg-yellow-400 text-white font-semibold text-3xl">BB</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-xs sm:text-base text-[#494949] mb-0.5">12 days ago</div>
                  <div className="text-base sm:text-lg lg:text-2xl font-bold text-black mb-2 sm:mb-4">
                    Bugs Bunny <span className="font-normal">just unlocked</span>
                  </div>
                  <div className="inline-flex items-center bg-[#F5F6F5] rounded-full px-3 sm:px-5 py-2 sm:py-3 gap-2 sm:gap-3">
                    <Mountain className="w-5 h-5 sm:w-7 sm:h-7 text-[#A3A4A3]" />
                    <span className="text-sm sm:text-lg font-semibold text-[#494949]">Growth Mindset</span>
                  </div>
                </div>
              </div>
              {/* Illustration */}
              <div className="hidden xs:block">
                <Image
                  src="/sideimage.png"
                  alt="Growth Mindset Illustration"
                  width={260}
                  height={180}
                  className="w-[100px] sm:w-[180px] lg:w-[260px] h-auto"
                  style={{ minWidth: 60 }}
                  priority
                />
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-2 sm:p-4 lg:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between shadow-sm mt-3 sm:mt-4 lg:mt-6">
              <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
                <Avatar className="w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24">
                  <AvatarImage src="/thumb1.jpg" />
                  <AvatarFallback className="bg-yellow-400 text-white font-semibold text-3xl">BB</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-xs sm:text-base text-[#494949] mb-0.5">12 days ago</div>
                  <div className="text-base sm:text-lg lg:text-2xl font-bold text-black mb-2 sm:mb-4">
                    Bugs Bunny <span className="font-normal">just unlocked</span>
                  </div>
                  <div className="inline-flex items-center bg-[#F5F6F5] rounded-full px-3 sm:px-5 py-2 sm:py-3 gap-2 sm:gap-3">
                    <Mountain className="w-5 h-5 sm:w-7 sm:h-7 text-[#A3A4A3]" />
                    <span className="text-sm sm:text-lg font-semibold text-[#494949]">Growth Mindset</span>
                  </div>
                </div>
              </div>
              {/* Illustration */}
              <div className="hidden xs:block">
                <Image
                  src="/sideimage.png"
                  alt="Growth Mindset Illustration"
                  width={260}
                  height={180}
                  className="w-[100px] sm:w-[180px] lg:w-[260px] h-auto"
                  style={{ minWidth: 60 }}
                  priority
                />
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-2 sm:p-4 lg:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between shadow-sm mt-3 sm:mt-4 lg:mt-6">
              <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
                <Avatar className="w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24">
                  <AvatarImage src="/thumb1.jpg" />
                  <AvatarFallback className="bg-yellow-400 text-white font-semibold text-3xl">BB</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-xs sm:text-base text-[#494949] mb-0.5">12 days ago</div>
                  <div className="text-base sm:text-lg lg:text-2xl font-bold text-black mb-2 sm:mb-4">
                    Bugs Bunny <span className="font-normal">just unlocked</span>
                  </div>
                  <div className="inline-flex items-center bg-[#F5F6F5] rounded-full px-3 sm:px-5 py-2 sm:py-3 gap-2 sm:gap-3">
                    <Mountain className="w-5 h-5 sm:w-7 sm:h-7 text-[#A3A4A3]" />
                    <span className="text-sm sm:text-lg font-semibold text-[#494949]">Growth Mindset</span>
                  </div>
                </div>
              </div>
              {/* Illustration */}
              <div className="hidden xs:block">
                <Image
                  src="/sideimage.png"
                  alt="Growth Mindset Illustration"
                  width={260}
                  height={180}
                  className="w-[100px] sm:w-[180px] lg:w-[260px] h-auto"
                  style={{ minWidth: 60 }}
                  priority
                />
              </div>
            </div>
          </div>
          {/* <div className="gird grid-cols-1"> */}
          <div className="hidden lg:w-[560px] lg:px-6 lg:pb-10 lg:bg-[#F5F6F5] lg:shrink-0 lg:block">
            {/* <div className="grid grid-cols-2 gap-8"> */}
            {/* Left Side: Signature Zones */}
            <div className="space-y-6">
              {/* Signature Zones */}
              <div>
                <div className="flex items-center mb-1">
                  <h5 className="text-[24px] font-semibold text-gray-900 mr-2">
                    Signature Zones
                  </h5>
                  <Tooltip text="Signature Zones are areas of excellence where team members shine most.">
                    <Info className="w-5 h-5 text-black" />
                  </Tooltip>
                </div>
                <p className="text-[18px] text-[#090A09] leading-tight mb-4 font-body tracking-[0.5]">
                  Mastery Zones and Squad Leaders with Most Moments received
                </p>

                <div className="space-y-4">
                  {/* Purpose Driven */}
                  <div className="flex gap-2">
                    <Badge className="bg-[#DDDEDD] text-[#494949] text-sm py-3.5 px-4 font-medium tracking-[0.1px] flex items-center mb-0">
                      <Mountain className="w-4 h-4 mr-2" />
                      Purpose Driven
                    </Badge>
                    <div className="flex -space-x-5">
                      {signatureZoneAvatars.map((avatar, i) => (
                        <Tooltip key={i} text={avatar.name}>
                          <Avatar className="w-12 h-12 border-2 border-white">
                            <AvatarImage src={avatar.src} />
                            <AvatarFallback>PD</AvatarFallback>
                          </Avatar>
                        </Tooltip>
                      ))}
                    </div>
                  </div>
                  {/* Communication */}
                  <div className="flex gap-2">
                    <Badge className="bg-[#DDDEDD] text-[#494949] text-sm py-3.5 px-4 font-medium tracking-[0.1px] flex items-center mb-0">
                      <MessageSquareCode className="w-4 h-4 mr-2" />
                      Communication
                    </Badge>
                    <div className="flex -space-x-5">
                      {communicationAvatars.map((avatar, i) => (
                        <Tooltip key={i} text={avatar.name}>
                          <Avatar className="w-12 h-12 border-2 border-white">
                            <AvatarImage src={avatar.src} />
                            <AvatarFallback>PD</AvatarFallback>
                          </Avatar>
                        </Tooltip>
                      ))}
                    </div>
                  </div>
                  {/* Collaboration */}
                  <div className="flex gap-2">
                    <Badge className="bg-[#DDDEDD] text-[#494949] text-sm py-3.5 px-4 font-medium tracking-[0.1px] flex items-center mb-0">
                      <Users className="w-4 h-4 mr-2" />
                      Collaboration
                    </Badge>
                    <div className="flex -space-x-5">
                      {collaborationAvatars.map((avatar, i) => (
                        <Tooltip key={i} text={avatar.name}>
                          <Avatar className="w-12 h-12 border-2 border-white">
                            <AvatarImage src={avatar.src} />
                            <AvatarFallback>PD</AvatarFallback>
                          </Avatar>
                        </Tooltip>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Hottest Mastery Zones */}
              <div className="pb-6 border-b-1 border-gray-400">
                <p className="text-lg font-medium text-[#090A09] mb-2 tracking-[0.5px] font-body">Hottest Mastery Zones this week</p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-[#DDDEDD] text-[#494949] text-sm py-3.5 px-4 font-medium tracking-[0.1px] flex items-center mb-0">
                    <Users className="w-4 h-4 mr-2" />
                    Risk Management | 8
                  </Badge>
                  <Badge className="bg-[#DDDEDD] text-[#494949] text-sm py-3.5 px-4 font-medium tracking-[0.1px] flex items-center mb-0">
                    <IceCream className="w-4 h-4 mr-2" />
                    Enthusiastic | 29
                  </Badge>
                </div>
              </div>
            </div>
            {/* Right Side: This Week's Skills Quest */}
            <div className="space-y-4">
              <div className="mt-7">
                <div className="flex items-center mb-1">
                  <h5 className="text-[24px] font-semibold text-gray-900 mr-2">
                    This Week&apos;s Skills Quest
                  </h5>
                  <Tooltip text="Signature Zones are areas of excellence where team members shine most.">
                    <Info className="w-5 h-5 text-black" />
                  </Tooltip>
                </div>

                <p className="text-[18px] text-[#090A09] leading-tight mb-4 font-body tracking-[0.5]">
                  Build your Squad&apos;s Mastery Zones by looking out for these actions. Did a Squadmate...
                </p>
                <p className="text-[18px] text-[#090A09] leading-tight mb-4 font-body tracking-[0.5]">
                  Get you or others to an &quot;aha&quot; moment
                </p>

                {/* Avatar Grid */}

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <Badge className="bg-[#DDDEDD] text-[#494949] text-sm py-3.5 px-4 font-medium tracking-[0.1px] flex items-center">
                    <Eye className="w-4 h-4 mr-2" />
                    Insightful
                  </Badge>

                  {gridAvatars.map((avatar, i) => (
                    <Tooltip key={i} text={avatar.name}>
                      <Avatar className="w-12 h-12 border-2 border-white shrink-0">
                        <AvatarImage src={avatar.src} />
                        <AvatarFallback>AV</AvatarFallback>
                      </Avatar>
                    </Tooltip>
                  ))}
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
