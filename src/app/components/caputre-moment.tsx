"use client"

import type React from "react"

import { useState } from "react"
import { FuzzyDropdown } from "../components/fuzzy-dropdown"
import { Button } from "../components/ui/button"
import { useRouter } from "next/navigation"
import { CustomDropdown, DropdownItem } from "./drop-down"
import { TextArea } from "../components/ui/textarea"
import Swal from "sweetalert2"
import FileUpload from "./file-upload"
import { supabase } from "@/lib/supabase/client"

export default function CaptureAMoment() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        squadmate: "",
        flowZone: "",
        reaction: "",
        note: "",
    })

    const squadmates = [
        "User Name One",
        "User Name Two",
        "User Name Three",
        "User Name Four",
        "John Doe",
        "Jane Smith",
        "Peter Jones",
        "Bugs Bunny",
        "Daffy Duck",
        "Tweety",
        "Henery Hawk",
    ]


    const flowZones = [
        "Last all hands meeting",
        "Client presentation",
        "Internal presentation",
        "Our 1:1",
        "Small group session",
        "Our team touchpoint",
        "Video call",
        "Other",
    ]

    const reactions = [
        "😎 Damn, you nailed it!",
        "👍 Way to go!",
        "👌 Couldn't have done it better myself",
        "👏 That was so cool!",
        "😊 You were really thoughtful!",
        
    ]

    const handleSubmit = () => {
        // Validate form data
        if (!formData.squadmate || !formData.flowZone || !formData.reaction) {
          Swal.fire({
            title: "Missing Information",
            text: "Please fill in all required fields before submitting.",
            icon: "warning",
            confirmButtonText: "OK",
            confirmButtonColor: "#3FD24D",
          })
          return
        }
    
        // Show success alert
        Swal.fire({
          html: `
            <div style="text-align: center; padding: 20px 10px;" class="font-body">
            <span class="text-[120px]">🎉</span>
              <div class="text-[16px] font-[600] text-black font-body">
                Woo hoo! You've just made ${formData.squadmate || "[username]"}'s day and helped them build a skill too!
              </div>
            </div>
          `,
          showConfirmButton: false,
          showCancelButton: false,
          width: "500px",
          padding: "17px",
          background: "#ffffff",
          backdrop: "rgba(0,0,0,0.4)",
          customClass: {
            popup: "success-modal",
            htmlContainer: "success-content",
          },
          didOpen: () => {
            // Add custom buttons
            const popup = Swal.getPopup()
            if (popup) {
              const buttonContainer = document.createElement("div")
              buttonContainer.style.cssText = `
                display: flex;
                gap: 15px;
                justify-content: center;
                flex-wrap: wrap;
              `
    
              const teamChannelBtn = document.createElement("button")
              teamChannelBtn.innerHTML = "GO TO TEAM CHANNEL"
              teamChannelBtn.className="font-heading"
              teamChannelBtn.style.cssText = `
                background: white;
                border: 2px solid #3FD24D;
                color: #3FD24D;
                padding: 12px 24px;
                border-radius: 25px;
                font-weight: 700;
                font-size: 14px;
                cursor: pointer;
                transition: all 0.2s;
                min-width: 160px;
              `
              teamChannelBtn.onmouseover = () => {
                teamChannelBtn.style.backgroundColor = "#e6f9e7"
              }
              teamChannelBtn.onmouseout = () => {
                teamChannelBtn.style.backgroundColor = "#ffff"
              }

              teamChannelBtn.onclick = () => {
                Swal.close()
                router.push("/team-channel")
              }
    
              const newMomentBtn = document.createElement("button")
              newMomentBtn.innerHTML = "NEW MOMENT"
              newMomentBtn.className="font-heading"
              newMomentBtn.style.cssText = `
                background: #3FD24D;
                border: 2px solid #3FD24D;
                color: #000;
                border-radius: 25px;
                font-weight: 700;
                font-size: 14px;
                cursor: pointer;
                transition: all 0.2s;
                min-width: 222px;
              `
              newMomentBtn.onmouseover = () => {
                newMomentBtn.style.backgroundColor = "#00b914"
              }
              newMomentBtn.onmouseout = () => {
                newMomentBtn.style.backgroundColor = "#3FD24D"
              }
              
              newMomentBtn.onclick = () => {
                Swal.close()
                // Reset form for new moment
                setFormData({
                  squadmate: "",
                  flowZone: "",
                  reaction: "",
                  note: "",
                })
              }
    
              buttonContainer.appendChild(teamChannelBtn)
              buttonContainer.appendChild(newMomentBtn)
              popup.appendChild(buttonContainer)
            }
          },
        })
    
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
      await supabase.auth.signOut();
      sessionStorage.removeItem("supabaseToken");
      window.location.href = "/login";
        // Add sign out logic here
        localStorage.clear()
        router.push("/login")
    }

    return (
        <>
        <style jsx global>{`
          .success-modal {
            border-radius: 16px !important;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
          }
          .success-content {
            margin: 0 !important;
          }
          @media (max-width: 640px) {
            .success-modal {
              width: 90% !important;
              margin: 0 auto !important;
            }
            .success-modal button {
              min-width: 140px !important;
              font-size: 12px !important;
              padding: 10px 20px !important;
            }
          }
        `}</style>
        <div className="mt-10 lg:mt-0 flex flex-1 flex-col item-center px-[1.5rem] pb-[3.9rem] justify-center">
            <div className="flex justify-between items-center align-middle mt-[1.25rem] mb-[1.1875rem]">
                <h4 className="lg:text-[34px] font-[600] text-gray-900 tracking-[0.25px]">Capture a Moment of Flow</h4>
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
                        <FuzzyDropdown
                            label="Which Squadmate would you like to encourage?"
                            options={squadmates}
                            value={formData.squadmate}
                            onChange={(value) => setFormData({ ...formData, squadmate: value })}
                            placeholder="Type their name or enter email to send an invite"
                            className="w-[451px] h-[46px] mb-8"
                        />
                    </div>
                    <div className="flex flex-col mb-10">
                        <FuzzyDropdown
                            label="Which Flow Zone did you notice?"
                            options={flowZones}
                            placeholder="Skill or trait name e.g. Creativity, Empathy"
                            value={formData.flowZone}
                            onChange={(value) => setFormData({ ...formData, flowZone: value })}
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
                                <button
                                    key={reaction}
                                    onClick={() => setFormData({ ...formData, reaction })}
                                    className={`px-6 py-3 rounded-full border-2 border-[#A3A4A3] text-[18px] text-[#A3A4A3] font-body font-[500] transition-colors ${formData.reaction === reaction
                                        ? "bg-green-50 text-green-500 border-green-500"
                                        : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                                        }`}
                                >
                                    {reaction}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="mb-[2.44rem]">
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
                    <FileUpload />

                    <Button
                    onClick={handleSubmit}
                        className="w-[452px] max-w-md h-[56px] bg-green-500 hover:bg-green-600 font-[700] text-[16px] rounded-full tracking-[0.5px] mb-8"
                    >
                        SUBMIT MOMENT
                    </Button>

                </div>
            </div>
        </div>
        </>

    )
}

