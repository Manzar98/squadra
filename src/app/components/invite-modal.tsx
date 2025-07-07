"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { X, PlusCircle } from "lucide-react"
import { useDispatch } from "react-redux"
import { addMember, type TeamMember } from "../../store"

interface InviteField {
  id: string
  email: string
  name: string
}

interface InviteModalProps {
  isOpen: boolean
  onClose: () => void
}

export function InviteModal({ isOpen, onClose }: InviteModalProps) {
  const [inviteFields, setInviteFields] = useState<InviteField[]>([{ id: "1", email: "", name: "" }])
  const [emailErrors, setEmailErrors] = useState<Record<string, boolean>>({})
  const dispatch = useDispatch()

  const addAnotherField = () => {
    const newField: InviteField = {
      id: Date.now().toString(),
      email: "",
      name: "",
    }
    setInviteFields([...inviteFields, newField])
  }

  const updateField = (id: string, field: "email" | "name", value: string) => {
    setInviteFields(inviteFields.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const handleSend = () => {
    // Basic validation: check for empty email only (no regex)
    let hasError = false
    const newEmailErrors: Record<string, boolean> = {}

    inviteFields.forEach((field) => {
      if (!field.email) {
        newEmailErrors[field.id] = true
        hasError = true
      } else {
        newEmailErrors[field.id] = false
      }
    })

    setEmailErrors(newEmailErrors)

    if (hasError) {
      // Optionally, you could show a toast or alert here
      return
    }

    inviteFields.forEach((field) => {
      if (field.email) {
        const newMember: TeamMember = {
          id: field.id + 1,
          name: field.name,
          email: field.email,
        }
        dispatch(addMember(newMember))
      }
    })
    setInviteFields([{ id: Date.now().toString(), email: "", name: "" }])
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4 lg:p-0">
      <div className="bg-white rounded-lg p-4 sm:p-5 lg:p-6 w-full max-w-sm sm:max-w-lg lg:max-w-2xl xl:max-w-4xl mx-2 sm:mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 sm:mb-5 lg:mb-7.5">
          <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-black pr-4">Invite people to Squadra</h4>
          <button
            onClick={onClose}
            className="text-black flex-shrink-0 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 font-bold" />
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-5 lg:mb-6">
          {inviteFields.map((field) => (
            <div key={field.id} className="flex flex-col sm:grid sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="flex flex-col">
                <label className="block text-sm sm:text-base lg:text-[16px] text-left font-semibold sm:font-[600] text-[#5B5C5B] mb-1.5 sm:mb-2 font-body">
                  Email address
                </label>
                <Input
                  type="email"
                  placeholder="user1@email.com"
                  value={field.email}
                  onChange={(e) => {
                    updateField(field.id, "email", e.target.value)
                    if (emailErrors && emailErrors[field.id]) {
                      setEmailErrors((prev) => ({ ...prev, [field.id]: false }))
                    }
                  }}
                  className="pl-3 sm:pl-4 py-2.5 sm:py-3 font-body h-10 sm:h-12 lg:h-[55%] text-sm sm:text-base"
                />
                {/* Always render error container to maintain consistent height */}
                <div className="h-5 pt-1">
                  <p 
                    className={`text-[12px] leading-[1.33] tracking-[0.4px] font-heading text-left transition-opacity duration-200 ${
                      emailErrors && emailErrors[field.id] 
                        ? "text-red-500 opacity-100" 
                        : "text-transparent opacity-0"
                    }`}
                  >
                    Email is required
                  </p>
                </div>
              </div>
              <div className="flex flex-col">
                <label className="block text-sm sm:text-base lg:text-[16px] text-left font-semibold sm:font-[600] text-[#5B5C5B] mb-1.5 sm:mb-2 font-body">
                  Name (optional)
                </label>
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={field.name}
                  onChange={(e) => updateField(field.id, "name", e.target.value)}
                  className="pl-3 sm:pl-4 py-2.5 sm:py-3 font-body h-10 sm:h-12 lg:h-[55%] text-sm sm:text-base"
                />
                {/* Empty error container to maintain grid alignment */}
                <div className="h-5 pt-1">
                  <p className="text-transparent opacity-0 text-[12px] leading-[1.33]">
                    Placeholder
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Another Button */}
        <button
          onClick={addAnotherField}
          className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-5 sm:mb-6 lg:mb-8 p-1 hover:bg-green-50 rounded transition-colors"
        >
          <PlusCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base lg:text-[16px] font-medium font-body">Add another</span>
        </button>

        {/* Send Button */}
        <div className="flex justify-end">
          <Button
            className="bg-green-500 hover:bg-green-600 text-black px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm lg:text-sm font-bold lg:font-[700] h-10 sm:h-12 lg:h-[50%] w-full sm:w-auto sm:min-w-[140px] lg:w-[30%]"
            onClick={handleSend}
          >
            SEND INVITATION
          </Button>
        </div>
      </div>
    </div>
  )
}
