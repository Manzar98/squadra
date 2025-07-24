"use client"

import { Suspense } from "react"
import SquadraForm from "../../components/signup-form"

export default function Page() {
  <Suspense fallback={<div>Loading...</div>}>
  return (
    <SquadraForm />
  )
  </Suspense>
}