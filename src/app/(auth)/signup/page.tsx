
import { Suspense, lazy } from "react"

const SignupComponent = lazy(() => import("../../components/signup-component"))

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupComponent/>
    </Suspense>
  )
}