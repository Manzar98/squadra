"use client"

import type React from "react"

import { useState } from "react"
import { EnhancedFuzzyDropdown } from "../components/ui/enhanced-fuzzy-dropdown"
import { Button } from "../components/ui/button"
import { useRouter } from "next/navigation"
import { CustomDropdown, DropdownItem } from "./drop-down"
import { TextArea } from "../components/ui/textarea"
import { useToast } from "../components/ui/toast"
import Modal from "../components/ui/modal"
import { logoutAction } from "@/lib/supabase/auth"
import { useSelector } from "react-redux"
import { selectFlowZones} from "../../store"
import { useTeamMembers } from "@/hooks/useTeamMembers"



export default function CaptureAMoment() {
    const router = useRouter()
    const flowZones = useSelector(selectFlowZones)
    const { teamMembers } = useTeamMembers()

    const toast = useToast()

    const [formData, setFormData] = useState({
        squadmateId: "",
        flowZoneId: "",
        reaction: "",
        note: "",
    })

    const [isSuccessOpen, setIsSuccessOpen] = useState(false)

    const reactions = [
        "😎 Damn, you nailed it!",
        "👍 Way to go!",
        "👌 Couldn't have done it better myself",
        "👏 That was so cool!",
        "😊 You were really thoughtful!",
        
    ]

    const handleSubmit = () => {

        // Validate form data
        if (!formData.squadmateId || !formData.flowZoneId || !formData.reaction) {
          toast.error("Missing Information", "Please fill in all required fields before submitting.")
          return
        }
    
        // Open success modal
        setIsSuccessOpen(true)
    
        // Store the form data
        localStorage.setItem("submittedMoment", JSON.stringify(formData))
      }

    const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value
        if (value.length <= 400) {
            setFormData({ ...formData, note: value })
        }
    }

    const handleProfileSettings = () => {
        router.push("/profile-settings")
    }

    const handleTeamSettings = () => {
        router.push("/team-settings")
    }

    const handleGetHelp = () => {
        router.push("/help")
    }

    const handleSignOut = async() => {
      
        await logoutAction()
        router.push("/login")
    }

    return (
        <>
        <div className="mt-22 xl:mt-0 flex flex-1 flex-col item-center px-[1.5rem] pb-[3.9rem] justify-center">
            <div className="flex justify-between items-center align-middle mt-[1.25rem] mb-[1.1875rem]">
                <h4 className="text-2xl lg:text-[34px]  font-[600] text-gray-900 tracking-[0.25px]">Capture a Moment of Flow</h4>
                <div className="hidden lg:flex">
                <CustomDropdown
                    align="right"
                    trigger={
                        <div className="w-15 h-15 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors border border-gray-200">
                            <span className="text-green-500 font-[600] text-[14px]">WM</span>
                        </div>
                    }
                >
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b border-gray-200">
                        <div className="text-[12px] font-medium text-black uppercase tracking-[2px] mb-1">PRODUCT MANAGER</div>
                        <div className="font-semibold text-black text-[1rem] tracking-[0.15px] font-body">Melissa Duck</div>
                        <div className="text-sm text-black font-body font-[400] tracking-[0.25px]">melissa.duck@looneytunes.com</div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                        <DropdownItem onClick={handleProfileSettings}>
                            <div className="flex items-center font-body text-[18px] tracking-[0.5px] font-[500]">
                                Profile settings
                            </div>
                        </DropdownItem>

                        <DropdownItem onClick={handleTeamSettings}>
                            <div className="flex items-center font-body text-[18px] tracking-[0.5px] font-[500]">
                                Team settings
                            </div>
                        </DropdownItem>

                        <DropdownItem onClick={handleGetHelp}>
                            <div className="flex items-center font-body text-[18px] tracking-[0.5px] font-[500]">
                                Get help
                            </div>
                        </DropdownItem>

                        <DropdownItem onClick={handleSignOut}>
                            <div className="flex items-center font-body text-[18px] tracking-[0.5px] font-[500]">
                                Sign out
                            </div>
                        </DropdownItem>
                    </div>
                </CustomDropdown>
                </div>

            </div>
            <div className="bg-white w-full h-full flex flex-col rounded-[6px] border-gray-200">
                <div className="max-w-4xl pl-[1.54rem] pt-[1.94rem]">
                    <div className="flex flex-col mb-10">
                        <EnhancedFuzzyDropdown
                            label="Which Squadmate would you like to encourage?"
                            options={teamMembers.map((member) => ({ id: member.id, name: member.name }))}
                            value={formData.squadmateId}
                            onChange={(id) => setFormData({ ...formData, squadmateId: id })}
                            placeholder="Type their name or enter email to send an invite"
                            className="w-[451px] h-[46px] mb-8"
                        />
                    </div>
                    <div className="flex flex-col mb-10">
                        <EnhancedFuzzyDropdown
                            label="Which Flow Zone did you notice?"
                            options={flowZones.map((flowZone) => ({ id: flowZone.id.toString(), name: flowZone.name }))}
                            placeholder="Skill or trait name e.g. Creativity, Empathy"
                            value={formData.flowZoneId}
                            onChange={(id) => setFormData({ ...formData, flowZoneId: id })}
                            className="w-[451px] h-[46px] mb-8"
                            isShow={true}
                        />
                    </div>
                    {/* Reaction Selection */}
                    <div className="flex flex-col mb-10">
                        <label className="block text-[16px] text-left font-[600] text-[#5B5C5B] mb-2 font-body">
                            Choose a phrase to show your reaction
                        </label>
                        <div className="flex flex-wrap gap-3">
                            {reactions.map((reaction) => (
                                <Button
                                    key={reaction}
                                    onClick={() => setFormData({ ...formData, reaction })}
                                    className={`px-6 py-3 rounded-full border-2 border-[#A3A4A3] text-[18px] text-[#A3A4A3] font-body font-[500] transition-colors ${formData.reaction === reaction
                                        ? "bg-green-50 text-green-500 border-green-500"
                                        : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                                        }`}
                                >
                                    {reaction}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div className="mb-[2.44rem] mr-4">
                        <label className="block text-[16px] text-left font-[600] text-[#5B5C5B] mb-2 font-body">Add a short personal note</label>
                        <div className="relative">
                            <TextArea
                                value={formData.note}
                                onChange={handleNoteChange}
                                placeholder="A personal note makes your encouragement more meaningful and adding specific context helps them reflect on what they did so they can build on it."
                                className="w-full lg:w-[52%] h-[15.33vh] px-4 py-3 border border-gray-300 rounded-xl text-[16px] font-[600] text-black font-body placeholder-[#A3A4A3] resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent font-body"
                            />
                            <div className="text-[12px] text-gray-400">{formData.note.length}/400</div>
                        </div>
                    </div>
                    {/* <FileUpload /> */}

                    <Button
                    onClick={handleSubmit}
                        className="w-[452px] max-w-md h-[56px] bg-green-500 hover:bg-green-600 font-[700] text-[16px] rounded-full tracking-[0.5px] mb-8"
                    >
                        SUBMIT MOMENT
                    </Button>

                </div>
            </div>
        </div>
        {/* Success Modal */}
        <Modal
          isOpen={isSuccessOpen}
          onClose={() => setIsSuccessOpen(false)}
          size="lg"
          showCloseButton={false}
          className="rounded-2xl"
        >
          <div className="text-center px-2 py-4">
            <div className="text-[120px] leading-none">🎉</div>
            <div className="text-[16px] font-[600] text-black mt-2 font-body">
              {`Woo hoo! You've just made ${teamMembers.find(m => m.id === formData.squadmateId)?.name || "[username]"}'s day and helped them build a skill too!`}
            </div>
            <div className="mt-6 flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-4 flex-nowrap">
              <Button
                className="font-heading bg-white border-2 border-[#3FD24D] text-[#3FD24D] font-[700] text-sm sm:min-w-[160px] transition-colors hover:bg-[#e6f9e7] w-full sm:w-auto"
                onClick={() => {
                  setIsSuccessOpen(false)
                  router.push("/team-channel")
                }}
              >
                GO TO TEAM CHANNEL
              </Button>
              <Button
                className="font-heading bg-[#3FD24D] border-2 border-[#3FD24D] text-black font-[700] text-sm sm:min-w-[222px] transition-colors hover:bg-[#00b914] w-full sm:w-auto"
                onClick={() => {
                  setIsSuccessOpen(false)
                  setFormData({ squadmateId: "", flowZoneId: "", reaction: "", note: "" })
                }}
              >
                NEW MOMENT
              </Button>
            </div>
          </div>
        </Modal>
        </>

    )
}

