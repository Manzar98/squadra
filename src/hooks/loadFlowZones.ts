'use client'

import { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch, setFlowZones } from '../store'
import { createClient } from '../lib/supabase/auth/client'
import { runWithSpan } from '@/lib/api-client'


export const useLoadFlowZones = () => {
    const supabase = createClient()
    const dispatch = useDispatch<AppDispatch>()
    
    const fetchFlowZones = useCallback(async () => {
        await runWithSpan("Fetch Flow Zones", async () => {
          const { data, error } = await supabase.from('flow-zones').select('id, name')
    
          if (error) throw error
    
          dispatch(setFlowZones(data || [])) // store [{ id, name }]
        })
      }, [dispatch, supabase])

      useEffect(() => {
        fetchFlowZones()
      }, [fetchFlowZones])
}