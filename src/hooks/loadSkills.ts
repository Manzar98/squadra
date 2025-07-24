'use client'

import { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { setSkills, AppDispatch } from '../store'
import { createSupabaseServerClient } from '../lib/supabase/client'

export const useLoadSkills = () => {
  const supabase = createSupabaseServerClient()
  const dispatch = useDispatch<AppDispatch>()

  const fetchSkills = useCallback(async () => {
    const { data, error } = await supabase.from('skills').select('id, name')
    if (error) {
      console.error('Failed to fetch skills:', error.message)
      return
    }
    dispatch(setSkills(data || [])) // now storing [{id, name}]
  }, [dispatch, supabase])

  useEffect(() => {
    fetchSkills()
  }, [fetchSkills])
}
