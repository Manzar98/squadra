'use client'

import { useEffect, useState, useCallback } from 'react'
import { createSupabaseServerClient } from '../../lib/supabase/client'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/navigation'
import CreateGroupModal from './create-group-modal'
import type { User as SupabaseAuthUser } from '@supabase/supabase-js'

const supabase = createSupabaseServerClient()

interface Message {
  id: string
  content: string
  sender_id: string
  receiver_id?: string
  group_id?: string
  seen?: boolean
  created_at: string
}

interface User {
  id: string
  user_id: string
  name: string
}

interface Group {
  id: string
  name: string
}

interface GroupMember {
  group_id: string
  groups: Group[]
}

export default function ChatRoom() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [user, setUser] = useState<SupabaseAuthUser | null>(null)
  const [receiverId, setReceiverId] = useState('')
  const [groupId, setGroupId] = useState('')
  const [users, setUsers] = useState<User[]>([])
  const [groups, setGroups] = useState<Group[]>([])
  const [chatType, setChatType] = useState<'dm' | 'group'>('dm')
  const [showCreateGroup, setShowCreateGroup] = useState(false)

  const fetchUsers = useCallback(async (currentUserId: string) => {
    const { data, error } = await supabase
      .from('users-info')
      .select('id, name, user_id')
      .neq('user_id', currentUserId)
      .order('name', { ascending: true })
    if (!error && data) setUsers(data as User[])
  }, [])

  const fetchGroups = useCallback(async (currentUserId: string) => {
    const { data, error } = await supabase
      .from('group_members')
      .select('group_id, groups(name, id)')
      .eq('user_id', currentUserId)
    if (!error && data) {
      const groups = (data as GroupMember[]).flatMap((gm) => gm.groups)
      setGroups(groups)
    }
  }, [])

  const fetchDM = useCallback(
    async (receiverIdParam: string) => {
      if (!user || !receiverIdParam) return
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .in('sender_id', [user.id, receiverIdParam])
        .in('receiver_id', [user.id, receiverIdParam])
        .order('created_at', { ascending: true })
      if (!error && data) setMessages(data as Message[])
    },
    [user]
  )

  const fetchGroupMessages = useCallback(async (groupIdParam: string) => {
    if (!groupIdParam) return
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('group_id', groupIdParam)
      .order('created_at', { ascending: true })
    if (!error && data) setMessages(data as Message[])
  }, [])

  const markAsSeen = useCallback(async (msgId: string) => {
    await supabase.from('messages').update({ seen: true }).eq('id', msgId)
  }, [])

  useEffect(() => {
    const getUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error || !user) return router.push('/login')
      setUser(user)
      fetchUsers(user.id)
      fetchGroups(user.id)
    }
    getUser()
  }, [fetchUsers, fetchGroups, router])

  // Listen for new messages and group membership changes
  useEffect(() => {
    if (!user) return
    setMessages([])

    if (chatType === 'dm' && receiverId) {
      fetchDM(receiverId)
    } else if (chatType === 'group' && groupId) {
      fetchGroupMessages(groupId)
    }

    const messageChannel = supabase
      .channel('chatroom-messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        const newMsg = payload.new as Message
        if (chatType === 'dm') {
          if (
            (newMsg.sender_id === user.id && newMsg.receiver_id === receiverId) ||
            (newMsg.sender_id === receiverId && newMsg.receiver_id === user.id)
          ) {
            setMessages((prev) => [...prev, newMsg])
            markAsSeen(newMsg.id)
          }
        } else if (chatType === 'group' && newMsg.group_id === groupId) {
          setMessages((prev) => [...prev, newMsg])
          markAsSeen(newMsg.id)
        }
      })
      .subscribe()

    const groupChannel = supabase
      .channel('chatroom-groups')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'group_members' }, (payload) => {
        // Only refresh groups if this user is affected
        if (payload.new.user_id === user.id) {
          fetchGroups(user.id)
        }
      })
      .subscribe()

    return () => {
      supabase.removeChannel(messageChannel)
      supabase.removeChannel(groupChannel)
    }
  }, [user, receiverId, groupId, chatType, fetchDM, fetchGroupMessages, markAsSeen, fetchGroups])

  const sendMessage = async () => {
    if (!input.trim() || !user) return
    const newMessage = {
      id: uuidv4(),
      content: input,
      sender_id: user.id,
      receiver_id: chatType === 'dm' ? receiverId : undefined,
      group_id: chatType === 'group' ? groupId : undefined,
      seen: false,
    }
    const { error } = await supabase.from('messages').insert(newMessage)
    if (!error) setInput('')
  }

  if (!user) return <div>Loading...</div>

  const handleReceiverChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUserId = e.target.value
    setReceiverId(selectedUserId)
    setMessages([])
    if (selectedUserId) fetchDM(selectedUserId)
    setGroupId('')
    setChatType('dm')
    setShowCreateGroup(false)
  }

  return (
    <div className="w-full max-w-md mx-auto border rounded p-4 space-y-4">
      <div className="flex gap-2">
        <button
          className={`px-3 py-1 rounded ${chatType === 'dm' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setChatType('dm')}
        >
          Direct
        </button>
        <button
          className={`px-3 py-1 rounded ${chatType === 'group' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setChatType('group')}
        >
          Group
        </button>
      </div>

      {chatType === 'dm' && (
        <select className="w-full border px-3 py-2 rounded" value={receiverId} onChange={handleReceiverChange}>
          <option value="">Select a user</option>
          {users.map((u) => (
            <option key={u.id} value={u.user_id}>
              {u.name}
            </option>
          ))}
        </select>
      )}

      {chatType === 'group' && (
        <div className="flex justify-between items-center">
          <select
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
            className="flex-1 border px-3 py-2 rounded"
          >
            <option value="">Select a group</option>
            {groups.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowCreateGroup(true)}
            className="ml-2 bg-green-500 text-white px-3 py-1 rounded"
          >
            +
          </button>
        </div>
      )}

      <div className="h-64 overflow-y-scroll border p-2 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-2 text-sm ${msg.sender_id === user.id ? 'text-right text-blue-600' : 'text-left text-gray-700'}`}
          >
            {msg.content}{' '}
            {msg.seen && msg.sender_id === user.id && <span className="text-xs text-green-500 ml-1">✓</span>}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 border px-3 py-1 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-1 rounded">
          Send
        </button>
      </div>

      {showCreateGroup && (
        <CreateGroupModal
          onGroupCreated={() => fetchGroups(user.id)}
          onClose={() => setShowCreateGroup(false)}
        />
      )}
    </div>
  )
}
