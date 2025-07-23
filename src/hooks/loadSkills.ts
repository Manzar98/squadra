'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setSkills, AppDispatch } from '../store'
import { createSupabaseServerClient } from '../lib/supabase/client'

export const useLoadSkills = () => {
  const supabase = createSupabaseServerClient()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const fetchSkills = async () => {
      const { data, error } = await supabase.from('skills').select('id, name')
      if (error) {
        console.error('Failed to fetch skills:', error.message)
        return
      }
      dispatch(setSkills(data || [])) // now storing [{id, name}]
    }

    fetchSkills()
  }, [dispatch])
}
