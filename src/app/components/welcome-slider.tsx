"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import { Button } from "../components/ui/button"
import { Check, MessageSquareTextIcon } from "lucide-react"
import { InviteModal } from "./invite-modal"
import { selectTeamMembers, type TeamMember } from "../../store"

export function WelcomeSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
  const [showSuccessScreen, setShowSuccessScreen] = useState(false)

  const teamMembers = useSelector(selectTeamMembers)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(
    teamMembers.find((member: TeamMember) => member.selected) || null
  )

  const [selectedSkill, setSelectedSkill] = useState("Communication")
  const [noteText, setNoteText] = useState(
    "You did great on the last training session. The content was so useful! You did great on the last training session"
  )
  const [selectedEmoji, setSelectedEmoji] = useState("😎")

  const skills = [
    "Collaboration", "Openness", "Innovation", "Adaptable", "Growth mindset", "Resilience",
    "Empathy", "Optimism", "Insightfulness", "Methodical", "Purpose driven", "Giver",
    "Organised", "Curiosity", "Humility", "Risk management", "Communication",
    "Resolving conflict", "Conscientious", "Enthusiastic"
  ]

  const emojis = ["👍", "✌️", "👏", "👌", "🤘", "😊", "😍", "😂", "🤑", "😎"]

  const selectMember = (member: TeamMember) => {
    setSelectedMember(member)
  }

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % 3)

  const handleSubmit = () => {
    console.log("Submitting moment:", {
      member: selectedMember,
      skill: selectedSkill,
      note: noteText,
      emoji: selectedEmoji,
    })
    setShowSuccessScreen(true)
  }

  const renderPaginationDots = () => (
    <div className="flex justify-center space-x-2 mb-8">
      {[0, 1, 2].map((index) => (
        <button
          key={index}
          onClick={() => setCurrentSlide(index)}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium cursor-pointer transition-colors border ${
            index <= currentSlide
              ? "bg-green-500 border-2 border-black text-black"
              : "bg-gray-200 text-gray-500 hover:bg-gray-300 border-black text-black"
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  )

  const renderFirstSlide = () => (
    <div className="max-w-4xl mx-auto">
      <div className="mb-[1.5rem]">
        <div className="flex items-center justify-center gap-3 mb-12">
          <MessageSquareTextIcon className="w-8 h-8 text-black bg-green-500" />
          <h1 className="text-[34px] font-[600] text-black">Give a Moment of Mastery now!</h1>
        </div>
        <h5 className="text-[24px] text-black mb-8 mt-[5.125rem] text-center font-heading">
          Which squadmate are you thinking of?
        </h5>
      </div>

      <div className="mb-[1rem]">
        <div className="bg-white border border-gray-200 rounded-md w-[20.56vw] mx-auto h-[21.33vh] overflow-y-auto">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              onClick={() => selectMember(member)}
              className={`flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 ${
                index !== teamMembers.length - 1 ? "border-b border-gray-200" : ""
              }`}
            >
              <div>
                <div className="font-medium text-gray-900">{member.name}</div>
                <div className="text-sm text-gray-500">{member.email}</div>
              </div>
              {selectedMember?.id === member.id && (
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-5 text-center">
        <Button
          onClick={() => setIsInviteModalOpen(true)}
          variant="outline"
          className="w-[20.97vw] h-[6.22vh] border-2 border-green-500 text-green-600 hover:bg-green-50 rounded-full px-4 py-5 text-[14px] tracking-[0.75px] font-[700] font-heading"
        >
          INVITE NEW SQUADMATE
        </Button>
      </div>

      {selectedMember && (
        <div className="mb-20 text-center">
          <p className="text-[16px] font-[600] text-[#2B2C2B] tracking-[0.15px] font-body">
          &apos;You have selected {selectedMember.name}&apos;
          </p>
        </div>
      )}

      {renderPaginationDots()}

      <div className="flex justify-center">
        
        <Button
          onClick={nextSlide}
          className="w-75 h-14 bg-green-500 hover:bg-green-600 text-black font-[700] px-5 py-4 rounded-full text-[14px] font-heading tracking-[0.75px]"
        >
          NEXT: CHOOSE A SKILL
        </Button>
      </div>
    </div>
  )

  const renderSecondSlide = () => (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-center gap-3 mb-12">
          <MessageSquareTextIcon className="w-8 h-8 text-black bg-green-500" />
          <h1 className="text-[34px] font-[600] text-black">
            Give {selectedMember?.name || "[selected user]"} a Moment of Mastery
          </h1>
        </div>
        <h5 className="text-[24px] text-black mt-[5.125rem] text-center font-heading">
          In which skill did they crush it recently?
        </h5>
      </div>

      <div className="mb-[10.7rem]">
        <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
          {skills.map((skill) => (
            <button
              key={skill}
              onClick={() => setSelectedSkill(skill)}
              className={`px-6 py-3 rounded-full border text-sm font-medium transition-colors ${
                selectedSkill === skill
                  ? "bg-green-500 text-white border-green-500"
                  : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {renderPaginationDots()}

      <div className="flex justify-center">
        
        <Button
          onClick={nextSlide}
          className="w-75 h-14 bg-green-500 hover:bg-green-600 text-black font-[700] px-5 py-4 rounded-full text-[14px] font-heading tracking-[0.75px]"
        >
          NEXT: ADD A SHORT NOTE
        </Button>
      </div>
    </div>
  )

  const renderThirdSlide = () => (
    <div className="max-w-4xl mx-auto">
      <div className="mb-[1.5rem]">
        <div className="flex items-center justify-center gap-3 mb-12">
          <MessageSquareTextIcon className="w-8 h-8 text-black bg-green-500" />
          <h1 className="text-[34px] font-[600] text-black">Give a Moment of Mastery</h1>
        </div>
        <h5 className="text-[24px] text-black mb-8 mt-[5.125rem] text-center font-heading">
          Why was the Moment of Mastery special?
        </h5>
      </div>

      <div className="mb-6">
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          className="w-full max-w-[80vw] mx-auto h-34 p-4 border-2 border-green-500 rounded-lg resize-none text-gray-400 text-base leading-relaxed font-body text-[1rem] font-[600]"
          placeholder="Add your note here..."
        />
      </div>

      <div className="mb-42">
        <div className="flex justify-center gap-4 flex-wrap">
          {emojis.map((emoji) => (
            <button
              key={emoji}
              onClick={() => setSelectedEmoji(emoji)}
              className={`w-12 h-12 text-2xl rounded-full transition-all hover:scale-110 ${
                selectedEmoji === emoji ? "bg-green-100 ring-2 ring-green-500 scale-110" : "hover:bg-gray-100"
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      {renderPaginationDots()}

      <div className="flex justify-center">
        <Button
          onClick={handleSubmit}
          className="w-75 h-14 bg-green-500 hover:bg-green-600 text-black font-[700] px-5 py-4 rounded-full text-[14px] font-heading tracking-[0.75px]"
        >
          SUBMIT MOMENT
        </Button>
      </div>
    </div>
  )

  const renderSuccessScreen = () => (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-6 w-[23.26vw] h-[37.22vh] flex items-center justify-center">
          <div className="text-[170px] leading-none">🥳</div>
        </div>

        <div className="mb-15">
          <h5 className="text-[24px] text-black mb-8 text-center font-heading">
            Way to go!! With this simple gesture&lsquo; your Squad can celebrate moving one step closer to Mastery!
          </h5>
          <h5 className="text-[24px] text-black mb-8 text-center font-heading">
            Now&lsquo; as your Squadmates give you Moments&lsquo; your Mastery Zones will magically unlock and ignite the Squad&apos;s Quest too!
          </h5>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={() => {
              setShowSuccessScreen(false)
              setCurrentSlide(0)
            }}
            className="w-50 h-14 bg-green-500 hover:bg-green-600 text-black font-[700] rounded-full text-[14px] font-heading tracking-[0.75px]"
          >
            EXPLORE SQUADRA!
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <div className="flex flex-1 items-center p-[1.5rem] justify-center">
        <div className="bg-white w-full h-full flex flex-col rounded-[6px] border-gray-200 pt-[3rem]">
          {showSuccessScreen ? renderSuccessScreen() : (
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
