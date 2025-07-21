// src/app/loadSkills.ts
'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setSkills } from '../store'
import { createSupabaseServerClient } from '../lib/supabase/client'
import { AppDispatch } from '../store'



export const useLoadSkills = () => {
  const supabase = createSupabaseServerClient();
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const fetchSkills = async () => {
      const { data, error } = await supabase.from('skills').select('name')
      if (error) {
        console.error('Failed to fetch skills:', error.message)
        return
      }
      const skills = data.map((row: { name: string }) => row.name)
      dispatch(setSkills(skills))
    }

    fetchSkills()
  }, [dispatch])
}
