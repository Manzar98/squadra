"use client"

import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Card, CardContent, CardHeader } from "../components/ui/cards"
import { Badge } from "../components/ui/badge"
import { Eye, Info, Mountain, Star } from "lucide-react"
import React from "react";
import { Tooltip } from "../components/ui/tooltip";
import Image from "next/image"
import ProfileDropDownMenu from "./profile-dropdown-menu"



export default function MasteryZone() {


  // Example avatar data for tooltips
  const signatureZoneAvatars = [
    { src: "/thumb1.jpg", name: "Bugs Bunny" },
    { src: "/thumb2.jpg", name: "Daffy Duck" },
    { src: "/thumb3.jpg", name: "Yosemite Sam" }
  ]


  return (
    <div className="flex flex-1 flex-col bg-[#F5F6F5]">
      <div className="px-2 sm:px-4 lg:px-6 pt-2 sm:pt-4.5">
        <div className="mt-14 lg:mt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-8 lg:mb-10.5 fixed-header">
          <div className="flex items-center gap-2 sm:gap-4 mt-10 lg:mt-0">
            <h4 className="text-2xl lg:text-[34px] font-semibold text-gray-900">Your Mastery Zones</h4>
            <Tooltip text="This is the channel for Looney Tunes." position="bottom">
              <span className="flex items-center gap-1 text-sm sm:text-base lg:text-lg text-gray-600 font-medium">
                <Info className="w-6 h-6 text-gray-400" aria-hidden="true" />
              </span>
            </Tooltip>

          </div>
          {/* add Profile dropdown here */}
          <div className="hidden lg:flex">
            <ProfileDropDownMenu />
          </div>
        </div>

        <div className="">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-6">
            {/* Weekly Stats Section */}
            <div className="lg:col-span-1">
              <Card className="bg-white border-0 shadow-sm">
                <CardHeader className="!p-4 !pb-0">
                  <div className="flex items-center gap-2">
                    <h5 className="text-2xl font-medium text-black">Weekly Stats</h5>
                    <Tooltip text="Weekly statistics overview" position="bottom">
                      <Info className="w-5 h-5 text-black" />
                    </Tooltip>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 !p-4 !pb-0">
                  <div className="mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-orange-500">🔥</span>
                      <span className="text-lg font-medium text-[#2B2C2B] tracking-[0.5px] font-body">Hottest Mastery Zones this week</span>
                    </div>
                    <div className="flex items-center gap-2 p-2">
                      <Badge className="bg-[#DDDEDD] text-[#494949] text-sm py-3.5 px-4 font-medium tracking-[0.1px] flex items-center mb-0">
                        <Mountain className="w-6 h-6 mr-2" />
                        Enthusiastic | 69
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-lg font-medium text-[#494949] font-body tracking-[0.5px]">
                      <span>32</span> Moments given{" "}
                      <span>(+x from last week)</span>
                    </div>
                    <div className="text-lg font-medium text-[#494949] font-body tracking-[0.5px]">
                      <span>20</span> Moments received{" "}
                      <span>(-x from last week)</span>
                    </div>
                  </div>

                  <div className="flex justify-end pb-2">
                    <span className="inline-block text-green-700 text-sm font-bold px-4 py-2 tracking-[0.75px]">
                      GIVE A MOMENT NOW!
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* This Week's Skills Quest Section */}
            <div className="lg:col-span-1">
              <Card className="bg-white border-0 shadow-sm">
                <CardHeader className="!p-4 !pb-0">
                  <div className="flex items-center gap-2">
                    <h5 className="text-2xl font-medium text-black">This Week&apos;s Skills Quest</h5>
                    <Tooltip text="Weekly statistics overview" position="bottom">
                      <Info className="w-5 h-5 text-black" />
                    </Tooltip>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 !p-4 !pb-24">
                  <div className="mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-medium text-[#2B2C2B] tracking-[0.5px] font-body">Build this Mastery Zone by putting this simple tip into action this week!</span>
                    </div>
                    <div className="flex items-center gap-2 p-2">
                      <Badge className="bg-[#DDDEDD] text-[#494949] text-sm py-3.5 px-4 font-medium tracking-[0.1px] flex items-center mb-0">
                        <Eye className="w-6 h-6 mr-2" />
                        Insightful | 1
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2 ">
                    <div className="text-lg font-medium text-[#494949] font-body tracking-[0.5px]">
                      <span>Dig deep into the problem so you can see it from different perspectives.</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-6">
            {/* Enthusiastic */}
            <div className="lg:col-span-1">
              <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start mb-3">
                    {/* Column 1: Image */}
                    <div className="flex-shrink-0 flex items-center justify-center mr-4">
                      <Image src="/Enthusiastic.png" alt="Enthusiastic" width={92} height={92} className="w-18 h-18 lg:w-24 lg:h-24" />
                    </div>
                    {/* Column 2: Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h5 className="text-2xl font-medium text-black">Enthusiastic</h5>
                          <Tooltip text="Weekly statistics overview" position="bottom">
                            <Star className="w-5 h-5 text-black" />
                          </Tooltip>
                        </div>
                        {/* <Tooltip text="This is a visual indicator for Insightfulness." position="top"> */}
                        <div className="relative w-[36px] h-[24px]">
                          <div className="absolute top-0 left-0 w-6 h-6 bg-green-500 rounded-full border-2 border-black"></div>
                          <div className="absolute top-0 left-[10px] w-6 h-6 bg-green-500 rounded-full border-2 border-black"></div>
                        </div>
                        {/* </Tooltip>  */}
                      </div>
                      <p className="text-sm text-[#5B5C5B] font-normal mb-2 font-body tracking-[0.25px]">
                        Spock read minds, but Squadmates aren&apos;t Vulcans. Just tell &apos;em what you&apos;re thinking.
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <div className="flex flex-row-reverse -space-x-3">
                            {signatureZoneAvatars.map((avatar, i) => (
                              <Tooltip key={i} text={avatar.name}>
                                <Avatar className="w-8 h-8">
                                  <AvatarImage src={avatar.src} />
                                  <AvatarFallback>PD</AvatarFallback>
                                </Avatar>
                              </Tooltip>
                            ))}
                          </div>
                          <span className="text-xs text-green-700 ml-2 tracking-[0.4px]">+92 others</span>
                        </div>
                        <Badge variant="secondary" className="text-sm text-green-700 font-bold tracking-[0.75px]">
                          78
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Resolving Conflict */}
            <div className="lg:col-span-1">
              <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start mb-3">
                    {/* Column 1: Image */}
                    <div className="flex-shrink-0 flex items-center justify-center mr-4">
                      <Image src="/Resolving.png" alt="Enthusiastic" width={96} height={96} className="w-18 h-18 lg:w-24 lg:h-24" />
                    </div>
                    {/* Column 2: Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h5 className="text-2xl font-medium text-black">Resolving Conflict</h5>
                        </div>
                        {/* <Tooltip text="This is a visual indicator for Insightfulness." position="top"> */}
                        <div className="relative w-[36px] h-[24px]">
                          <div className="absolute top-0 left-0 w-6 h-6 bg-green-500 rounded-full border-2 border-black"></div>
                          <div className="absolute top-0 left-[10px] w-6 h-6 bg-white rounded-full border-2 border-black"></div>
                        </div>
                        {/* </Tooltip> */}
                      </div>
                      <p className="text-sm text-[#5B5C5B] font-normal mb-2 font-body tracking-[0.25px]">
                        Look for work that is meaningful – if you haven’t found it , keep looking!
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <div className="flex flex-row-reverse -space-x-3">
                            {[...signatureZoneAvatars].reverse().map((avatar, i) => (
                              <Tooltip key={i} text={avatar.name}>
                                <Avatar className="w-8 h-8">
                                  <AvatarImage src={avatar.src} />
                                  <AvatarFallback>PD</AvatarFallback>
                                </Avatar>
                              </Tooltip>
                            ))}
                          </div>
                          <span className="text-xs text-green-700 ml-2 tracking-[0.4px]">+9 others</span>
                        </div>
                        <Badge variant="secondary" className="text-sm text-green-700 font-bold tracking-[0.75px]">
                          29
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            { /* Communication */}
            <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start mb-3">
                  {/* Column 1: Image */}
                  <div className="flex-shrink-0 flex items-center justify-center mr-4">
                    <Image src="/Insightfulness.png" alt="Enthusiastic" width={96} height={96} className="w-18 h-18 lg:w-24 lg:h-24" />
                  </div>
                  {/* Column 2: Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h5 className="text-2xl font-medium text-black">Insightfulness</h5>
                      </div>
                      {/* <Tooltip text="This is a visual indicator for Insightfulness." position="top"> */}
                      <div className="relative w-[36px] h-[24px]">
                        <div className="absolute top-0 left-0 w-6 h-6 bg-gray-300 rounded-full border-2 border-black"></div>
                        <div className="absolute top-0 left-[10px] w-6 h-6 bg-white rounded-full border-2 border-black"></div>
                      </div>
                      {/* </Tooltip> */}
                    </div>
                    <p className="text-sm text-[#5B5C5B] font-normal mb-2 font-body tracking-[0.25px]">
                      Spock read minds, but Squadmates aren&apos;t Vulcans. Just tell &apos;em what you&apos;re thinking.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <div className="flex flex-row-reverse -space-x-3">
                          {[...signatureZoneAvatars].reverse().map((avatar, i) => (
                            <Tooltip key={i} text={avatar.name}>
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={avatar.src} />
                                <AvatarFallback>PD</AvatarFallback>
                              </Avatar>
                            </Tooltip>
                          ))}
                        </div>
                        <span className="text-xs text-green-700 ml-2 tracking-[0.4px]">+9 others</span>
                      </div>
                      <Badge variant="secondary" className="text-sm text-green-700 font-bold tracking-[0.75px]">
                        29
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Collaboration */}
            <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start mb-3">
                  {/* Column 1: Image */}
                  <div className="flex-shrink-0 flex items-center justify-center mr-4">
                    <Image src="/Collaboration.png" alt="Collaboration" width={96} height={96} className="w-18 h-18 lg:w-24 lg:h-24" />
                  </div>
                  {/* Column 2: Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h5 className="text-2xl font-medium text-black">Collaboration</h5>
                      </div>
                      {/* <Tooltip text="This is a visual indicator for Insightfulness." position="top"> */}
                      <div className="relative w-[36px] h-[24px]">
                        <div className="absolute top-0 left-0 w-6 h-6 bg-gray-300 rounded-full border-2 border-black"></div>
                        <div className="absolute top-0 left-[10px] w-6 h-6 bg-white rounded-full border-2 border-black"></div>
                      </div>
                      {/* </Tooltip> */}
                    </div>
                    <p className="text-sm text-[#5B5C5B] font-normal mb-2 font-body tracking-[0.25px]">
                      Spock read minds, but Squadmates aren&apos;t Vulcans. Just tell &apos;em what you&apos;re thinking.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <div className="flex flex-row-reverse -space-x-3">
                          {signatureZoneAvatars.map((avatar, i) => (
                            <Tooltip key={i} text={avatar.name}>
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={avatar.src} />
                                <AvatarFallback>PD</AvatarFallback>
                              </Avatar>
                            </Tooltip>
                          ))}
                        </div>
                        <span className="text-xs text-green-700 ml-2 tracking-[0.4px]">+9 others</span>
                      </div>
                      <Badge variant="secondary" className="text-sm text-green-700 font-bold tracking-[0.75px]">
                        29
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Optimism */}
            <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start mb-3">
                  {/* Column 1: Image */}
                  <div className="flex-shrink-0 flex items-center justify-center mr-4">
                    <Image src="/Optimism.png" alt="Optimism" width={96} height={96} className="w-18 h-18 lg:w-24 lg:h-24" />
                  </div>
                  {/* Column 2: Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h5 className="text-2xl font-medium text-black">Optimism</h5>
                      </div>
                      {/* <Tooltip text="This is a visual indicator for Insightfulness." position="top"> */}
                      <div className="relative w-[36px] h-[24px]">
                        <div className="absolute top-0 left-0 w-6 h-6 bg-gray-300 rounded-full border-2 border-black"></div>
                        <div className="absolute top-0 left-[10px] w-6 h-6 bg-white rounded-full border-2 border-black"></div>
                      </div>
                      {/* </Tooltip>  */}
                    </div>
                    <p className="text-sm text-[#5B5C5B] font-normal mb-2 font-body tracking-[0.25px]">
                      Spock read minds, but Squadmates aren&apos;t Vulcans. Just tell &apos;em what you&apos;re thinking.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <div className="flex flex-row-reverse -space-x-3">
                          {signatureZoneAvatars.map((avatar, i) => (
                            <Tooltip key={i} text={avatar.name}>
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={avatar.src} />
                                <AvatarFallback>PD</AvatarFallback>
                              </Avatar>
                            </Tooltip>
                          ))}
                        </div>
                        <span className="text-xs text-green-700 ml-2 tracking-[0.4px]">+4 others</span>
                      </div>
                      <Badge variant="secondary" className="text-sm text-green-700 font-bold tracking-[0.75px]">
                        15
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            { /* Organized */}
            <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start mb-3">
                  {/* Column 1: Image */}
                  <div className="flex-shrink-0 flex items-center justify-center mr-4">
                    <Image src="/Organised.png" alt="organised" width={96} height={96} className="w-18 h-18 lg:w-24 lg:h-24" />
                  </div>
                  {/* Column 2: Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h5 className="text-2xl font-medium text-black">Organised</h5>
                      </div>
                      {/* <Tooltip text="This is a visual indicator for Insightfulness." position="top"> */}
                      <div className="relative w-[36px] h-[24px]">
                        <div className="absolute top-0 left-0 w-6 h-6 bg-gray-300 rounded-full border-2 border-black"></div>
                        <div className="absolute top-0 left-[10px] w-6 h-6 bg-white rounded-full border-2 border-black"></div>
                      </div>
                      {/* </Tooltip>  */}
                    </div>
                    <p className="text-sm text-[#5B5C5B] font-normal mb-2 font-body tracking-[0.25px]">
                      Spock read minds, but Squadmates aren&apos;t Vulcans. Just tell &apos;em what you&apos;re thinking.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <div className="flex -space-x-11">
                          {signatureZoneAvatars.slice(0, 2).map((avatar, i) => (
                            <Tooltip key={i} text={avatar.name}>
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={avatar.src} />
                                <AvatarFallback>PD</AvatarFallback>
                              </Avatar>
                            </Tooltip>
                          ))}
                        </div>
                        <span className="text-xs text-green-700 ml-2 tracking-[0.4px]">+4 others</span>
                      </div>
                      <Badge variant="secondary" className="text-sm text-green-700 font-bold tracking-[0.75px]">
                        15
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            { /* Innovation */}
            <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start mb-3">
                  {/* Column 1: Image */}
                  <div className="flex-shrink-0 flex items-center justify-center mr-4">
                    <Image src="/Creativity.png" alt="creativity" width={96} height={96} className="w-18 h-18 lg:w-24 lg:h-24" />
                  </div>
                  {/* Column 2: Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h5 className="text-2xl font-medium text-black">Innovation</h5>
                      </div>
                      {/* <Tooltip text="This is a visual indicator for Insightfulness." position="top"> */}
                      <div className="relative w-[36px] h-[24px]">
                        <div className="absolute top-0 left-0 w-6 h-6 bg-gray-300 rounded-full border-2 border-black"></div>
                        <div className="absolute top-0 left-[10px] w-6 h-6 bg-white rounded-full border-2 border-black"></div>
                      </div>
                      {/* </Tooltip>  */}
                    </div>
                    <p className="text-sm text-[#5B5C5B] font-normal mb-2 font-body tracking-[0.25px]">
                      Spock read minds, but Squadmates aren&apos;t Vulcans. Just tell &apos;em what you&apos;re thinking.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <div className="flex -space-x-11">
                          {signatureZoneAvatars.slice(0, 2).map((avatar, i) => (
                            <Tooltip key={i} text={avatar.name}>
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={avatar.src} />
                                <AvatarFallback>PD</AvatarFallback>
                              </Avatar>
                            </Tooltip>
                          ))}
                        </div>
                        <span className="text-xs text-green-700 ml-2 tracking-[0.4px]">+4 others</span>
                      </div>
                      <Badge variant="secondary" className="text-sm text-green-700 font-bold tracking-[0.75px]">
                        15
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            { /* Resilience */}
            <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start mb-3">
                  {/* Column 1: Image */}
                  <div className="flex-shrink-0 flex items-center justify-center mr-4">
                    <Image src="/Resilience.png" alt="resilience" width={96} height={96} className="w-18 h-18 lg:w-24 lg:h-24" />
                  </div>
                  {/* Column 2: Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h5 className="text-2xl font-medium text-black">Resilience</h5>
                      </div>
                      {/* <Tooltip text="This is a visual indicator for Insightfulness." position="top"> */}
                      <div className="relative w-[36px] h-[24px]">
                        <div className="absolute top-0 left-0 w-6 h-6 bg-gray-300 rounded-full border-2 border-black"></div>
                        <div className="absolute top-0 left-[10px] w-6 h-6 bg-white rounded-full border-2 border-black"></div>
                      </div>
                      {/* </Tooltip> */}
                    </div>
                    <p className="text-sm text-[#5B5C5B] font-normal mb-2 font-body tracking-[0.25px]">
                      Spock read minds, but Squadmates aren&apos;t Vulcans. Just tell &apos;em what you&apos;re thinking.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <div className="flex -space-x-11">
                          {signatureZoneAvatars.slice(0, 2).map((avatar, i) => (
                            <Tooltip key={i} text={avatar.name}>
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={avatar.src} />
                                <AvatarFallback>PD</AvatarFallback>
                              </Avatar>
                            </Tooltip>
                          ))}
                        </div>
                        <span className="text-xs text-green-700 ml-2 tracking-[0.4px]">+7 others</span>
                      </div>
                      <Badge variant="secondary" className="text-sm text-green-700 font-bold tracking-[0.75px]">
                        9
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
