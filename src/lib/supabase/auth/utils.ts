import { createClient } from './server'
import { redirect } from 'next/navigation'

export async function getUser() {
  const supabase = await createClient()
  
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    return user
  } catch (error) {
    console.error('Error getting user:', error)
    return null
  }
}

export async function requireAuth() {
  const user = await getUser()
  
  if (!user) {
    redirect('/login')
  }
  
  return user
}

export async function requireNoAuth() {
  const user = await getUser()
  
  if (user) {
    redirect('/dashboard')
  }
}
