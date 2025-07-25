'use client'

import { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { setSkills, AppDispatch } from '../store'
import { createSupabaseServerClient } from '../lib/supabase/client'
import { runWithSpan } from '@/lib/api-client'

export const useLoadSkills = () => {
  const supabase = createSupabaseServerClient()
  const dispatch = useDispatch<AppDispatch>()

  const fetchSkills = useCallback(async () => {
    await runWithSpan("Fetch Skills", async () => {
      const { data, error } = await supabase.from('skills').select('id, name')

      if (error) throw error

      dispatch(setSkills(data || [])) // store [{ id, name }]
    })
  }, [dispatch, supabase])

  useEffect(() => {
    fetchSkills()
  }, [fetchSkills])
}
