'use client'

import { useEffect } from 'react'
import clarity from '@microsoft/clarity'
import { useLoadSkills } from '../hooks/loadSkills'
import { useLoadFlowZones } from '../hooks/loadFlowZones'

export const StartupInitializer = () => {
  useLoadSkills()
  useLoadFlowZones()

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      clarity.init(process.env.NEXT_PUBLIC_CLARITY_ID!)
    }
  }, [])

  return null
}
