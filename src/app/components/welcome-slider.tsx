"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import { Button } from "../components/ui/button"
import { InviteModal } from "./invite-modal"
import { selectSkills } from '../../store'
import { useTeamMembers } from "@/hooks/useTeamMembers"
import { useMomentSubmission } from "@/hooks/useMomentSubmission"
import { TeamMember, SelectedSkill, MomentFormData } from "@/types"
import { SlideHeader } from "./ui/slide-header"
import { PaginationDots } from "./ui/pagination-dots"
import { TeamMemberSelector } from "./moment-slider/team-member-selector"
import { SkillSelector } from "./moment-slider/skill-selector"
import { NoteComposer } from "./moment-slider/note-composer"
import { SuccessScreen } from "./moment-slider/success-screen"

export function WelcomeSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
  const [showSuccessScreen, setShowSuccessScreen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [selectedSkills, setSelectedSkills] = useState<SelectedSkill[]>([])
  const [noteText, setNoteText] = useState(
    "You did great on the last training session. The content was so useful! You did great on the last training session",
  )
  const [selectedEmoji, setSelectedEmoji] = useState("😎")
  
  const skills = useSelector(selectSkills)
  const { teamMembers, authenticatedUser, addNewMembers } = useTeamMembers()
  const { submitMoment, isSubmitting } = useMomentSubmission()

  const handleInvitesSent = (newMembers: TeamMember[]) => {
    addNewMembers(newMembers);
  };

  const selectMember = (member: TeamMember) => {
    setSelectedMember(member);
  };

  const handleSkillToggle = (skill: SelectedSkill) => {
    setSelectedSkills(prev => 
      prev.some(s => s.name === skill.name)
        ? prev.filter(s => s.name !== skill.name)
        : [...prev, skill]
    );
  };

  const handleEmojiSelect = (emoji: string, text: string) => {
    setSelectedEmoji(emoji);
    setNoteText(text);
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % 3);

  const handleSubmit = async () => {
    const formData: MomentFormData = {
      selectedMember,
      selectedSkills,
      noteText,
      selectedEmoji,
    };

    const success = await submitMoment(formData);
    if (success) {
      setShowSuccessScreen(true);
    }
  };

  const handleContinue = () => {
    setShowSuccessScreen(false);
    setCurrentSlide(0);
  };

  const renderFirstSlide = () => (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <SlideHeader
        title="Give a Moment of Mastery now!"
        subtitle="Which squadmate are you thinking of?"
      />

      <TeamMemberSelector
        teamMembers={teamMembers}
        selectedMember={selectedMember}
        onMemberSelect={selectMember}
        onInviteClick={() => setIsInviteModalOpen(true)}
      />

      <PaginationDots
        totalSlides={3}
        currentSlide={currentSlide}
        onSlideChange={setCurrentSlide}
      />

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
      <SlideHeader
        title={`Give ${selectedMember?.name || "[selected user]"} a Moment of Mastery`}
        subtitle="In which skill did they crush it recently?"
      />

      <SkillSelector
        skills={skills}
        selectedSkills={selectedSkills}
        onSkillToggle={handleSkillToggle}
      />

      <PaginationDots
        totalSlides={3}
        currentSlide={currentSlide}
        onSlideChange={setCurrentSlide}
      />

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
      <SlideHeader
        title="Give a Moment of Mastery"
        subtitle="Why was the Moment of Mastery special?"
      />

      <NoteComposer
        noteText={noteText}
        selectedEmoji={selectedEmoji}
        onNoteChange={setNoteText}
        onEmojiSelect={handleEmojiSelect}
      />

      <PaginationDots
        totalSlides={3}
        currentSlide={currentSlide}
        onSlideChange={setCurrentSlide}
      />

      <div className="flex justify-center pb-4 sm:pb-6 lg:mb-28.5">
        <Button
          onClick={handleSubmit}
          className="w-full sm:w-auto min-w-[200px] lg:w-75 h-12 sm:h-14 bg-green-500 hover:bg-green-600 text-black font-bold px-4 sm:px-5 py-3 sm:py-4 rounded-full text-xs sm:text-sm lg:text-[14px] font-heading tracking-[0.75px]"
          isLoading={isSubmitting}
        >
          SUBMIT MOMENT
        </Button>
      </div>
    </div>
  )

  return (
    <>
      <div className="flex flex-1 items-center p-4 sm:p-6 lg:p-[1.5rem] justify-center min-h-screen">
        <div className="bg-white w-full h-full flex flex-col rounded-md sm:rounded-[6px] border border-gray-200 pt-6 sm:pt-8 lg:pt-[3rem] min-h-[600px] sm:min-h-[700px] lg:min-h-[800px]">
          {showSuccessScreen ? (
            <SuccessScreen onContinue={handleContinue} />
          ) : (
            <>
              {currentSlide === 0 && renderFirstSlide()}
              {currentSlide === 1 && renderSecondSlide()}
              {currentSlide === 2 && renderThirdSlide()}
            </>
          )}
        </div>
      </div>
      <InviteModal 
        isOpen={isInviteModalOpen} 
        onClose={() => setIsInviteModalOpen(false)} 
        onInvitesSent={handleInvitesSent} 
        authenticatedUser={authenticatedUser} 
      />
    </>
  )
}
