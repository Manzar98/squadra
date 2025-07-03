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
            <div className="flex items-center justify-center lg:mt-[18.625rem] lg:mx-[7.375rem] mt-[15rem]">
              <h2 className="lg:text-[60px] font-[600] text-black font-heading">{currentSlideData.title}</h2>
            </div>
            <div className="flex items-center justify-center mt-[3rem] lg:mx-[7.375rem] mb-[8.4rem]">
              <h5 className="lg:text-[24px] text-center text-black font-[500] mx-auto">
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
            <div className="flex flex-col items-center justify-center lg:ml-[7.75rem] lg:mr-[7rem] mb-5">
              <h5 className="lg:text-[24px] text-center text-black font-[500] mx-auto">
                {currentSlideData.subtitle}
              </h5>
              <div className="flex items-center mt-8 px-2">
                <h5 className="lg:text-[24px] text-center text-black font-[500] mx-auto ">
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
                className="max-w-full max-h-[352px] object-contain mb-5"
                style={{ width: "100%", height: "auto"}}
              >
                <Image
                  src={currentSlideData.image || "/placeholder.svg"}
                  alt="Slide 2"
                  width={830}
                  height={395}
                  style={{ objectFit: "contain" }}
                  className="mx-auto"
                  priority
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center lg:ml-[7.75rem] lg:mr-[7rem] mb-7.5">
              <h5 className="lg:text-[24px] text-center text-black font-[500] mx-auto">
                {currentSlideData.subtitle}
              </h5>
              <div className="flex items-center mt-8 px-2">
                <h5 className="lg:text-[24px] text-center text-black font-[500] mx-auto ">
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
    <div className="flex flex-1 items-center p-4 sm:p-6 lg:p-[1.5rem] justify-center">
    <div className="bg-white w-full h-full flex flex-col rounded-[6px] border border-gray-200">
      {/* Full screen height split into content and footer */}
      <div className="flex flex-col justify-between min-h-[400px] sm:min-h-[500px] lg:min-h-auto">
        <div>{renderSlide()}</div>

        {/* Fixed bottom controls */}
        <div className="flex flex-col items-center justify-center pb-4 sm:pb-6 lg:pb-[2rem]">
            {/* Pagination dots */}
            <div className="flex justify-center space-x-1.5 sm:space-x-2 mb-4 sm:mb-6 lg:mb-[1.5rem]">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-3 lg:h-3 rounded-full transition-colors ${
                    index === currentSlide ? "bg-green-500" : "bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Buttons */}
            {currentSlide === slides.length - 1 ? (
              <Button
                onClick={handleStartMoment}
                className="w-full max-w-[280px] h-12 sm:w-full sm:max-w-[320px] sm:h-14 lg:w-[20.83vw] lg:h-[6.22vh] bg-green-500 hover:bg-green-600 text-black font-[700] px-4 sm:px-6 lg:px-8 rounded-full text-[10px] sm:text-xs lg:text-[14px] font-heading tracking-[0.75px]"
              >
                START: GIVE A MOMENT
              </Button>
            ) : (
              <Button
                onClick={nextSlide}
                className="w-full max-w-[200px] h-12 sm:w-full sm:max-w-[240px] sm:h-14 lg:w-[13.88vw] lg:h-[6.22vh] bg-green-500 hover:bg-green-600 text-black font-[700] px-4 sm:px-6 lg:px-8 rounded-full text-[10px] sm:text-xs lg:text-[14px] font-heading tracking-[0.75px]"
              >
                NEXT
              </Button>
            )}
          </div>
      </div>
    </div>
  </div>
  )
  
}
