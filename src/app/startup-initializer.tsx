'use client'

import { useEffect } from 'react'
import clarity from '@microsoft/clarity'
import { useLoadSkills } from '../hooks/loadSkills'

export const StartupInitializer = () => {
  useLoadSkills()

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      clarity.init(process.env.NEXT_PUBLIC_CLARITY_ID!)
    }
  }, [])

  return null
}
