"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import { Button } from "../components/ui/button"
import { Check, MessageSquareTextIcon } from "lucide-react"
import { InviteModal } from "./invite-modal"
import { selectTeamMembers, type TeamMember } from "../../store"
import { TextArea } from "./ui/textarea"
import Image from "next/image"


export function WelcomeSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
  const [showSuccessScreen, setShowSuccessScreen] = useState(false)
  const teamMembers = useSelector(selectTeamMembers)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(
    teamMembers.find((member: TeamMember) => member.selected) || null,
  )
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [noteText, setNoteText] = useState(
    "You did great on the last training session. The content was so useful! You did great on the last training session",
  )
  const [selectedEmoji, setSelectedEmoji] = useState("😎")

  const skills = [
    "Collaboration",
    "Openness",
    "Innovation",
    "Adaptable",
    "Growth mindset",
    "Resilience",
    "Empathy",
    "Optimism",
    "Insightfulness",
    "Methodical",
    "Purpose driven",
    "Giver",
    "Organised",
    "Curiosity",
    "Humility",
    "Risk management",
    "Communication",
    "Resolving conflict",
    "Conscientious",
    "Enthusiastic",
  ]

  const emojis = [
    { symbol: "👍", text: "Great job!", tooltip: "Thumbs up" },
    { symbol: "✌️", text: "You handled that like a pro!", tooltip: "Peace sign" },
    { symbol: "👏", text: "Amazing effort!", tooltip: "Clapping hands" },
    { symbol: "👌", text: "Perfect execution!", tooltip: "OK gesture" },
    { symbol: "🤘", text: "Rocked it!", tooltip: "Rock on" },
    { symbol: "😊", text: "So proud of your growth!", tooltip: "Smiling face" },
    { symbol: "😍", text: "Loved your work!", tooltip: "Heart eyes" },
    { symbol: "😂", text: "That was both smart and fun!", tooltip: "Tears of joy" },
    { symbol: "🤑", text: "Crushed the numbers!", tooltip: "Money face" },
    { symbol: "😎", text: "You nailed it cool style!", tooltip: "Cool sunglasses" },
  ]

  const selectMember = (member: TeamMember) => {
    setSelectedMember(member)
  }

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % 3)

  const handleSubmit = () => {
    console.log("Submitting moment:", {
      member: selectedMember,
      skill: selectedSkills,
      note: noteText,
      emoji: selectedEmoji,
    })
    setShowSuccessScreen(true)
  }

  const renderPaginationDots = () => (
    <div className="flex justify-center space-x-2 mb-4 sm:mb-6">
      {[0, 1, 2].map((index) => (
        <button
          key={index}
          onClick={() => setCurrentSlide(index)}
          className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium cursor-pointer transition-colors border-2 ${
            index <= currentSlide
              ? "bg-green-500 border-black text-black"
              : "bg-gray-200 text-gray-500 hover:bg-gray-300 border-black"
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  )

  const renderFirstSlide = () => (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-4 sm:mb-6 mt-9 lg:mt-0">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-12">
          <MessageSquareTextIcon className="w-6 h-6 sm:w-8 sm:h-8 text-black bg-green-500 rounded" />
          <h4 className="text-[1rem] lg:text-3xl xl:text-[34px] font-semibold sm:font-[600] text-black text-center leading-tight">
            Give a Moment of Mastery now!
          </h4>
        </div>
        <h5 className="text-[1rem] sm:text-xl lg:text-2xl xl:text-[24px] text-black mb-4 sm:mb-6 mt-8 sm:mt-16 lg:mt-[5.125rem] text-center font-heading">
          Which squadmate are you thinking of?
        </h5>
      </div>

      <div className="content-div min-h-[440px] sm:min-h-[390px] lg:min-h-[390px] max-h-[440px] sm:max-h-[350px] lg:max-h-[390px] overflow-y-auto mb-4 sm:mb-6">
        <div className="mb-4">
          <div className="bg-white border border-gray-200 rounded-md w-full sm:w-4/5 lg:w-3/5 xl:w-[20.56vw] mx-auto h-[250px] sm:h-[280px] lg:h-[21.33vh] overflow-y-auto">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                onClick={() => selectMember(member)}
                className={`flex items-center justify-between p-3 sm:p-4 cursor-pointer hover:bg-gray-50 ${
                  index !== teamMembers.length - 1 ? "border-b border-gray-200" : ""
                }`}
              >
                <div>
                  <div className="font-medium text-gray-900 text-sm sm:text-base">{member.name}</div>
                  <div className="text-xs sm:text-sm text-gray-500">{member.email}</div>
                </div>
                {selectedMember?.id === member.id && (
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4 sm:mb-5 text-center">
          <Button
            onClick={() => setIsInviteModalOpen(true)}
            variant="outline"
            className="w-full sm:w-4/5 lg:w-3/5 xl:w-[20.97vw] h-12 sm:h-14 lg:h-[6.22vh] border-2 border-green-500 text-green-600 hover:bg-green-50 rounded-full px-4 py-3 sm:py-5 text-xs sm:text-sm lg:text-[14px] tracking-[0.75px] font-bold font-heading"
          >
            INVITE NEW SQUADMATE
          </Button>
        </div>

        {selectedMember && (
          <div className="text-center">
            <p className="text-sm sm:text-base lg:text-[16px] font-semibold lg:font-[600] text-[#2B2C2B] tracking-[0.15px] font-body">
              &apos;You have selected {selectedMember.name}&apos;
            </p>
          </div>
        )}
      </div>

      {renderPaginationDots()}

      <div className="flex justify-center pb-4 sm:pb-6">
        <Button
          onClick={nextSlide}
          className="w-full sm:w-auto min-w-[200px] lg:w-75 h-12 sm:h-14 bg-green-500 hover:bg-green-600 text-black font-bold px-4 sm:px-5 py-3 sm:py-4 rounded-full text-xs sm:text-sm lg:text-[14px] font-heading tracking-[0.75px]"
        >
          NEXT: CHOOSE A SKILL
        </Button>
      </div>
    </div>
  )

  const renderSecondSlide = () => (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-4 sm:mb-6 mt-9 lg:mt-0">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-12">
          <MessageSquareTextIcon className="w-6 h-6 sm:w-8 sm:h-8 text-black bg-green-500 rounded" />
          <h4 className="text-[1rem] lg:text-3xl xl:text-[34px] font-semibold sm:font-[600] text-black text-center leading-tight">
            Give {selectedMember?.name || "[selected user]"} a Moment of Mastery
          </h4>
        </div>
        <h5 className="text-[1rem] sm:text-xl lg:text-2xl xl:text-[24px] text-black mt-8 sm:mt-16 lg:mt-[5.125rem] mb-4 sm:mb-6 text-center font-heading">
          In which skill did they crush it recently?
        </h5>
      </div>

      <div className="content-div min-h-[440px] sm:min-h-[390px] lg:min-h-[390px] max-h-[440px] sm:max-h-[350px] lg:max-h-[390px] overflow-y-auto mb-4 sm:mb-6">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-5xl mx-auto text-center px-2">
          {skills.map((skill) => (
            <button
              key={skill}
              onClick={() => {
                if (selectedSkills.includes(skill)) {
                  setSelectedSkills(selectedSkills.filter((s) => s !== skill))
                } else {
                  setSelectedSkills([...selectedSkills, skill])
                }
              }}
              className={`h-8 sm:h-10 px-3 sm:px-4 align-middle rounded-full border-2 text-sm sm:text-base lg:text-[18px] tracking-[0.5px] font-medium transition-colors font-body ${
                selectedSkills.includes(skill)
                  ? "bg-green-50 text-green-500 border-green-500"
                  : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {renderPaginationDots()}

      <div className="flex justify-center pb-4 sm:pb-6 lg:mb-28.5">
        <Button
          onClick={nextSlide}
          className="w-full sm:w-auto min-w-[200px] lg:w-75 h-12 sm:h-14 bg-green-500 hover:bg-green-600 text-black font-bold px-4 sm:px-5 py-3 sm:py-4 rounded-full text-xs sm:text-sm lg:text-[14px] font-heading tracking-[0.75px]"
        >
          NEXT: ADD A SHORT NOTE
        </Button>
      </div>
    </div>
  )

  const renderThirdSlide = () => (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-4 sm:mb-6 mt-9 lg:mt-0">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-12">
          <MessageSquareTextIcon className="w-6 h-6 sm:w-8 sm:h-8 text-black bg-green-500 rounded" />
          <h4 className="text-[1rem] lg:text-3xl xl:text-[34px] font-semibold sm:font-[600] text-black text-center leading-tight">
            Give a Moment of Mastery
          </h4>
        </div>
        <h5 className="text-[1rem] sm:text-xl lg:text-2xl xl:text-[24px] text-black mb-4 sm:mb-6 mt-8 sm:mt-16 lg:mt-[5.125rem] text-center font-heading">
          Why was the Moment of Mastery special?
        </h5>
      </div>

      <div className="content-div min-h-[440px] sm:min-h-[390px] lg:min-h-[390px] max-h-[440px] sm:max-h-[390px] lg:max-h-[390px] overflow-y-auto mb-4 sm:mb-6">
        <div className="mb-4 sm:mb-6">
          <TextArea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            className="w-full max-w-full sm:max-w-[90vw] lg:max-w-[80vw] mx-auto h-24 sm:h-32 lg:h-34 p-3 sm:p-4 border-2 border-green-500 rounded-lg resize-none focus:!border-green-600 active:!border-green-600 focus:!ring-0 text-gray-700 text-sm sm:text-base lg:text-base leading-relaxed font-body font-semibold lg:font-[600]"
            placeholder="Add your note here..."
          />
        </div>

        <div className="px-2">
          <div className="flex justify-center gap-1 sm:gap-2 flex-wrap">
            {emojis.map((emoji) => (
              <div className="relative group" key={emoji.symbol}>
                <span
                  onClick={() => {
                    setSelectedEmoji(emoji.symbol)
                    setNoteText(emoji.text)
                  }}
                  className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-2xl sm:text-3xl lg:text-[3rem] rounded-full cursor-pointer transition-all duration-300 ${
                    selectedEmoji
                      ? selectedEmoji === emoji.symbol
                        ? "scale-110 sm:scale-125 opacity-100"
                        : "opacity-30"
                      : "opacity-100"
                  }`}
                >
                  {emoji.symbol}
                </span>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 sm:px-3 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  {emoji.tooltip}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {renderPaginationDots()}

      <div className="flex justify-center pb-4 sm:pb-6 lg:mb-28.5">
        <Button
          onClick={handleSubmit}
          className="w-full sm:w-auto min-w-[200px] lg:w-75 h-12 sm:h-14 bg-green-500 hover:bg-green-600 text-black font-bold px-4 sm:px-5 py-3 sm:py-4 rounded-full text-xs sm:text-sm lg:text-[14px] font-heading tracking-[0.75px]"
        >
          SUBMIT MOMENT
        </Button>
      </div>
    </div>
  )

  const renderSuccessScreen = () => (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mt-2 lg:mt-0 mb-4 sm:mb-6 flex items-center justify-center">
          <Image
            src="/success.gif"
            alt="Celebration"
            width={250}
            height={250}
            className="object-contain mx-auto"
            priority
          />
        </div>

        <div className="mb-8 sm:mb-12 lg:mb-15 space-y-4 sm:space-y-6 lg:space-y-8">
          <h5 className="text-lg sm:text-xl lg:text-2xl xl:text-[24px] text-black text-center font-heading leading-relaxed px-2">
            Way to go!! With this simple gesture&lsquo; your Squad can celebrate moving one step closer to Mastery!
          </h5>
          <h5 className="text-lg sm:text-xl lg:text-2xl xl:text-[24px] text-black text-center font-heading leading-relaxed px-2">
            Now&lsquo; as your Squadmates give you Moments&lsquo; your Mastery Zones will magically unlock and ignite
            the Squad&apos;s Quest too!
          </h5>
        </div>

        <div className="flex justify-center pb-4 sm:pb-6">
          <Button
            onClick={() => {
              setShowSuccessScreen(false)
              setCurrentSlide(0)
            }}
            className="w-full sm:w-auto min-w-[200px] lg:w-60 h-12 sm:h-14 bg-green-500 hover:bg-green-600 text-black font-bold rounded-full text-xs sm:text-sm lg:text-[14px] font-heading tracking-[0.75px] px-4 sm:px-6"
          >
            EXPLORE SQUADRA!
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <div className="flex flex-1 items-center p-4 sm:p-6 lg:p-[1.5rem] justify-center min-h-screen">
        <div className="bg-white w-full h-full flex flex-col rounded-md sm:rounded-[6px] border border-gray-200 pt-6 sm:pt-8 lg:pt-[3rem] min-h-[600px] sm:min-h-[700px] lg:min-h-[800px]">
          {showSuccessScreen ? (
            renderSuccessScreen()
          ) : (
            <>
              {currentSlide === 0 && renderFirstSlide()}
              {currentSlide === 1 && renderSecondSlide()}
              {currentSlide === 2 && renderThirdSlide()}
            </>
          )}
        </div>
      </div>
      <InviteModal isOpen={isInviteModalOpen} onClose={() => setIsInviteModalOpen(false)} />
    </>
  )
}
