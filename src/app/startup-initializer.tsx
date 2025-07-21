'use client'

import { useLoadSkills } from '../hooks/loadSkills'

export const StartupInitializer = () => {
  useLoadSkills()
  return null
}