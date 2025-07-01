"use client"
import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { X, Plus } from "lucide-react"
import { useDispatch } from "react-redux"
import { addMember, TeamMember } from "../../store"

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
    
    inviteFields.forEach((field) => {
      if (field.email) {
        const newMember: TeamMember = {
          id: field.id+1,
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
    <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Invite people to Squadra</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-4 mb-6">
          {inviteFields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-2 gap-4">
              <div>
                {index === 0 && <label className="block text-sm font-medium text-gray-700 mb-2">Email address</label>}
                <Input
                  type="email"
                  placeholder="user1@email.com"
                  value={field.email}
                  onChange={(e) => updateField(field.id, "email", e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                {index === 0 && <label className="block text-sm font-medium text-gray-700 mb-2">Name (optional)</label>}
                <Input
                  type="text"
                  placeholder="Full Name[]"
                  value={field.name}
                  onChange={(e) => updateField(field.id, "name", e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Add Another Button */}
        <button onClick={addAnotherField} className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-8">
          <Plus className="w-4 h-4" />
          <span className="font-medium">Add another</span>
        </button>

        {/* Send Button */}
        <div className="flex justify-end">
          <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-2 rounded-full" onClick={handleSend}>SEND INVITATION</Button>
        </div>
      </div>
    </div>
  )
}
