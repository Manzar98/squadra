"use client"

import { useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "../../../lib/supabase/auth/client"
import { AuthLayout } from "../../components/auth/auth-layout"
import { LoginForm } from "../../components/auth/login-form"
import ForgotPasswordModal from '../../components/forgot-password'
import { useState } from "react"

const supabase = createClient()

function LoginPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Check if user is already authenticated
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const redirectTo = searchParams.get('redirectedFrom') || '/dashboard'
        router.push(redirectTo)
      }
    }
    checkUser()
  }, [router, searchParams])

  return (
    <AuthLayout>
      {/* Login Form */}
      <h6 className="text-[20px] font-body tracking-[0.12px] font-[700] py-10 text-center lg:text-left">
        Sign in to your account
      </h6>
      
      <LoginForm searchParams={searchParams} />
      
      <ForgotPasswordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </AuthLayout>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPageContent />
    </Suspense>
  )
}
