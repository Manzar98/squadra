"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Check, MessageSquareTextIcon } from "lucide-react"
import { InviteModal } from "./invite-modal"
import { useSelector } from "react-redux"
import { selectTeamMembers, type TeamMember } from "../../store"

export function WelcomeSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const teamMembers = useSelector(selectTeamMembers)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(
    teamMembers.find((member: TeamMember) => member.selected) || null,
  )
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
  const [selectedSkill, setSelectedSkill] = useState<string>("Communication")
  const [noteText, setNoteText] = useState<string>(
    "You did great on the last training session. The content was so useful! You did great on the last training session",
  )
  const emojis = ["👍", "✌️", "👏", "👌", "🤘", "😊", "😍", "😂", "🤑", "😎"]
  const [selectedEmoji, setSelectedEmoji] = useState<string>("😎")

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

  const selectMember = (member: TeamMember) => {
    setSelectedMember(member)
    // Optionally, you could dispatch an action to update selected in Redux
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 3)
  }

  const renderFirstSlide = () => (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8 mt-2">
        <div className="flex items-center justify-center gap-3 mb-12">
          <MessageSquareTextIcon className="w-8 h-8 text-black bg-green-500" />
          <h1 className="text-[34px] font-[600] text-black">Give a Moment of Mastery now!</h1>
        </div>
        <p className="text-[24px] text-black mb-8 mt-[100px] font-heading">Which squadmate are you thinking of?</p>
      </div>

      {/* Team Member Selection */}
      <div className="mb-6">
        <div className="bg-white border border-gray-200 rounded-lg max-w-md mx-auto max-h-48 overflow-y-auto">
          {teamMembers.map((member: TeamMember, index: number) => (
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
              {selectedMember && member.id === selectedMember.id && (
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Invite Button */}
      <div className="mb-6">
        <Button
          onClick={() => setIsInviteModalOpen(true)}
          variant="outline"
          className="w-[302px] h-[56px] border-green-500 text-green-600 hover:bg-green-50 font-medium rounded-full px-8 py-2 text-[14px] tracking-[0.75px] font-[700] font-heading"
        >
          INVITE NEW SQUADMATE
        </Button>
      </div>

      {/* Selected Member Display */}
      {selectedMember && (
        <div className="mb-8">
          <p className="text-[16px] font-[600] text-[#2B2C2B] tracking-[0.15px] font-body">
            &apos;You have selected {selectedMember.name}&apos;
          </p>
        </div>
      )}

      {/* Pagination dots */}
      <div className="flex justify-center space-x-2 mb-8">
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium cursor-pointer transition-colors ${
              index === currentSlide ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Next Button - Centered */}
      <div className="flex justify-center">
        <Button
          onClick={nextSlide}
          className="w-[300px] h-[56px] bg-green-500 hover:bg-green-600 text-black font-[700] px-8 py-3 rounded-full text-[14px] font-heading tracking-[0.75px]"
        >
          NEXT: CHOOSE A SKILL
        </Button>
      </div>
    </div>
  )

  const renderSecondSlide = () => (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8 mt-2">
        <div className="flex items-center justify-center gap-3 mb-12">
          <MessageSquareTextIcon className="w-8 h-8 text-black bg-green-500" />
          <h1 className="text-[34px] font-[600] text-black">
            Give {selectedMember?.name || "[selected user]"} a Moment of Mastery
          </h1>
        </div>
        <p className="text-[24px] text-black mb-8 mt-[100px] font-heading">
          In which skill did they crush it recently?
        </p>
      </div>

      {/* Skills Selection */}
      <div className="mb-12">
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

      {/* Pagination dots */}
      <div className="flex justify-center space-x-2 mb-8">
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium cursor-pointer transition-colors ${
              index < currentSlide
                ? "bg-green-500 text-white"
                : index === currentSlide
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-500 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Next Button - Centered */}
      <div className="flex justify-center">
        <Button
          onClick={nextSlide}
          className="w-[300px] h-[56px] bg-green-500 hover:bg-green-600 text-black font-[700] px-8 py-3 rounded-full text-[14px] font-heading tracking-[0.75px]"
        >
          NEXT: ADD A SHORT NOTE
        </Button>
      </div>
    </div>
  )

  const renderThirdSlide = () => (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8 mt-2">
        <div className="flex items-center justify-center gap-3 mb-12">
          <MessageSquareTextIcon className="w-8 h-8 text-black bg-green-500" />
          <h1 className="text-[34px] font-[600] text-black">Give a Moment of Mastery</h1>
        </div>
        <p className="text-[24px] text-black mb-8 mt-[100px] font-heading">Why was the Moment of Mastery special?</p>
      </div>

      {/* Note Text Area */}
      <div className="mb-8">
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          className="w-full max-w-2xl mx-auto h-32 p-4 border-2 border-green-500 rounded-lg resize-none text-gray-700 text-base leading-relaxed"
          placeholder="Add your note here..."
        />
      </div>

      {/* Emoji Selection */}
      <div className="mb-12">
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

      {/* Pagination dots */}
      <div className="flex justify-center space-x-2 mb-8">
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium cursor-pointer transition-colors ${
              index <= currentSlide ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Submit Button - Centered */}
      <div className="flex justify-center">
        <Button
          onClick={() => {
            // Handle submission logic here
            console.log("Submitting moment:", {
              member: selectedMember,
              skill: selectedSkill,
              note: noteText,
              emoji: selectedEmoji,
            })
          }}
          className="w-[300px] h-[56px] bg-green-500 hover:bg-green-600 text-black font-[700] px-8 py-3 rounded-full text-[14px] font-heading tracking-[0.75px]"
        >
          SUBMIT MOMENT
        </Button>
      </div>
    </div>
  )

  return (
    <>
      <div className="flex-1 p-6 flex items-center justify-center relative">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm w-full h-full flex-col items-center justify-center text-center p-8">
          {currentSlide === 0 && renderFirstSlide()}
          {currentSlide === 1 && renderSecondSlide()}
          {currentSlide === 2 && renderThirdSlide()}
        </div>

        {/* Skip Button - Positioned absolutely on the left, aligned with Next button */}
        <Button
          variant="ghost"
          className={`absolute text-gray text-[16px] left-8 tracking-[0.15px] font-body ${
            currentSlide === 0 ? "bottom-[170px]" : "bottom-[205px]"
          }`}
          onClick={() => setCurrentSlide(2)}
        >
          SKIP
        </Button>
      </div>

      <InviteModal isOpen={isInviteModalOpen} onClose={() => setIsInviteModalOpen(false)} />
    </>
  )
}
