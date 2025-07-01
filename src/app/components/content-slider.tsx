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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const handleStartMoment = () => {
    router.push("/dashboard/moment")
  }

  const currentSlideData = slides[currentSlide]

  return (
    <div className="flex-1 p-6 flex items-center justify-center">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm w-full h-full flex flex-col items-center justify-center text-center">
        {/* Main content */}
        <div className="max-w-[900px] mx-auto">
          <div className="mb-8">
          {currentSlideData.image && currentSlideData.image !== "" && (
            <div className="mx-auto max-w-full max-h-[352px] object-contain" style={{ width: "100%", height: "auto", marginBottom: "20px" }}>
              <Image
                src={currentSlideData.image}
                alt={currentSlideData.title || "Slide image"}
                width={900}
                height={352}
                style={{ width: "100%", height: "auto", objectFit: "contain" }}
                className="mx-auto"
                priority
              />
            </div>
          )}
          {currentSlideData.title && <h1 className="text-[60px] font-[600] text-black font-[600] mb-8 align-middle ">{currentSlideData.title}</h1> }
            <h5 className="text-[24px] text-black font-[500] mx-auto mb-3 --font-heading">{currentSlideData.subtitle}</h5>
           {currentSlideData.description && <h5 className="text-[24px] text-black font-[500] mx-auto --font-heading">{currentSlideData.description}</h5> } 
          </div>


          {/* Pagination dots */}
          <div className="flex justify-center space-x-2 mb-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? "bg-green-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Next or Start a moment button */}
          {currentSlide === slides.length - 1 ? (
            <Button
              onClick={handleStartMoment}
              className="w-[300px] h-[56px] bg-green-500 hover:bg-green-600 text-black font-[700] px-8 py-3 rounded-full text-[14px] font-heading tracking-[0.75px]"
            >
              START: GIVE A MOMENT
            </Button>
          ) : (
            <Button
              onClick={nextSlide}
              className="bg-green-500 hover:bg-green-600 text-black font-[700] px-8 py-3 rounded-full text-[14px] font-heading tracking-[0.75px]"
            >
              NEXT
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
