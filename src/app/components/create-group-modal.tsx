'use client'

import { useEffect, useState } from 'react'
import { createClient } from '../../lib/supabase/auth/client'
import { v4 as uuidv4 } from 'uuid'

interface User {
  id: string
  name: string
  user_id: string
}

interface Props {
  onGroupCreated: () => void
  onClose: () => void
}

export default function CreateGroupModal({ onGroupCreated, onClose }: Props) {
  const supabase = createClient()

  const [groupName, setGroupName] = useState('')
  const [allUsers, setAllUsers] = useState<User[]>([])
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const current: User = {
          id: user.id,
          name: user.user_metadata?.name ?? "Unknown",
          user_id: user.id,
        };
        setCurrentUser(current);
        const { data: users } = await supabase.from('users-info').select('id, name, user_id');
        if (users) setAllUsers(users.filter((u) => u.user_id !== user.id));
      }
    };
  
    fetchData();
  }, [supabase]);

  const toggleUser = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    )
  }

  const handleCreateGroup = async () => {
    if (!groupName || selectedUsers.length === 0) return

    const groupId = uuidv4()

    // Insert group
    await supabase.from('groups').insert({
      id: groupId,
      name: groupName,
      created_by: currentUser?.id,
    })

    // Insert members (including creator)
    const members = [
      ...selectedUsers.map((userId) => ({
        group_id: groupId,
        user_id: userId,
      })),
      { group_id: groupId, user_id: currentUser?.id },
    ]

    await supabase.from('group_members').insert(members)

    onGroupCreated()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Create Group</h2>

        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Group name"
          className="w-full border px-3 py-2 rounded mb-4"
        />

        <div className="h-40 overflow-y-auto border rounded p-2 mb-4">
          {allUsers.map((user) => (
            <label key={user.user_id} className="block mb-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedUsers.includes(user.user_id)}
                onChange={() => toggleUser(user.user_id)}
                className="mr-2"
              />
              {user.name}
            </label>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-300">
            Cancel
          </button>
          <button onClick={handleCreateGroup} className="px-4 py-2 rounded bg-blue-600 text-white">
            Create
          </button>
        </div>
      </div>
    </div>
  )
}
