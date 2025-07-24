"use client"

import { Suspense, lazy } from "react"

const SquadraForm = lazy(() => import("../../components/signup-form"))

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SquadraForm />
    </Suspense>
  )
}