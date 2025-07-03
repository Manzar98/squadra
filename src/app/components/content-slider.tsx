"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../components/ui/button"
import Image from "next/image"

interface Slide {
  id: number
  title: string
  subtitle: string
  description: string
  image?: string
}

const slides: Slide[] = [
  {
    id: 1,
    title: "👋 Welcome!",
    image: "",
    subtitle:
      "Squadra is your team's virtual coach, helping you discover and master the skills that matter to you and your Squad!",
    description: "",
  },
  {
    id: 2,
    title: "",
    image: "/slide-1.png",
    subtitle:
      "Think of Skills Mastery as a Quest, your teammates or Squadmates as your sidekicks and Squadra as your gentle guide.",
    description: "Now in this Quest, skills rock and small Moments of Mastery matter! Let's show you how it works...",
  },
  {
    id: 3,
    title: "",
    image: "/slide-2.png",
    subtitle:
      "Each time one of you crushes it in a skill, you'll give each other Moments of Mastery. Every Moment received moves you one step closer to Mastery.",
    description:
      "Now here's the thing: successful quests are true team efforts. So why not jump start your Squad's Quest by giving a Moment of Mastery now!",
  },
]

export function ContentSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const router = useRouter()
  const currentSlideData = slides[currentSlide]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const handleStartMoment = () => {
    router.push("/dashboard/moment")
  }

  const renderSlide = () => {
    switch (currentSlide) {
      case 0:
        return (
          <>
            <div className="flex items-center justify-center mt-[18.625rem] mx-[7.375rem]">
              <h2 className="text-[60px] font-[600] text-black font-heading">{currentSlideData.title}</h2>
            </div>
            <div className="flex items-center justify-center mt-[3rem] mx-[7.375rem] mb-[8.4rem]">
              <h5 className="text-[24px] text-center text-black font-[500] mx-auto">
                {currentSlideData.subtitle}
              </h5>
            </div>
          </>
        )
      case 1:
        return (
          <>
            <div className="flex items-center justify-center mt-[4.625rem]">
              <div
                className="mx-auto max-w-full max-h-[352px] object-contain"
                style={{ width: "100%", height: "auto", marginBottom: "20px" }}
              >
                <Image
                  src={currentSlideData.image || "/placeholder.svg"}
                  alt="Slide 1"
                  width={612}
                  height={352}
                  style={{ objectFit: "contain" }}
                  className="mx-auto"
                  priority
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center ml-[7.75rem] mr-[7rem] mb-5">
              <h5 className="text-[24px] text-center text-black font-[500] mx-auto">
                {currentSlideData.subtitle}
              </h5>
              <div className="flex items-center mt-8 px-2">
                <h5 className="text-[24px] text-center text-black font-[500] mx-auto ">
                  {currentSlideData.description}
                </h5>
              </div>
            </div>
          </>
        )
      case 2:
        return (
          <>
            <div className="flex items-center justify-center mt-[4.625rem]">
              <div
                className="mx-auto max-w-full max-h-[352px] object-contain"
                style={{ width: "100%", height: "auto", marginBottom: "20px" }}
              >
                <Image
                  src={currentSlideData.image || "/placeholder.svg"}
                  alt="Slide 2"
                  width={956}
                  height={395}
                  style={{ objectFit: "contain" }}
                  className="mx-auto"
                  priority
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center ml-[7.75rem] mr-[7rem] mb-5">
              <h5 className="text-[24px] text-center text-black font-[500] mx-auto">
                {currentSlideData.subtitle}
              </h5>
              <div className="flex items-center mt-8 px-2">
                <h5 className="text-[24px] text-center text-black font-[500] mx-auto ">
                  {currentSlideData.description}
                </h5>
              </div>
            </div>
          </>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-1 item-center p-[1.5rem] justify-center">
      {/* w-[60.2vw] h-[78.9vh] */}
      <div className="bg-white w-full h-full flex flex-col rounded-[6px] border-gray-200">
        {renderSlide()}

        <div className="flex items-center justify-center">
          <div className="w-full flex flex-col items-center">
            {/* Pagination dots */}
            <div className="flex justify-center space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? "bg-green-500" : "bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Buttons */}
            <div className="flex justify-center mt-[2.5rem]">
              {currentSlide === slides.length - 1 ? (
                <Button
                  onClick={handleStartMoment}
                  className="w-[20.83vw] h-[6.22vh] bg-green-500 hover:bg-green-600 text-black font-[700] px-8 rounded-full text-[14px] font-heading tracking-[0.75px]"
                >
                  START: GIVE A MOMENT
                </Button>
              ) : (
                <Button
                  onClick={nextSlide}
                  className="w-[13.88vw] h-[6.22vh] bg-green-500 hover:bg-green-600 text-black font-[700] px-8 rounded-full text-[14px] font-heading tracking-[0.75px]"
                >
                  NEXT
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
