"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import Image from "next/image"
import { createSupabaseServerClient } from "../../../lib/supabase/client"
import { runWithSpan } from "@/lib/api-client"
import { useRouter } from "next/navigation"
import InputField from "../../components/ui/input-field"
import ForgotPasswordModal from '../../components/forgot-password'

const supabase = createSupabaseServerClient()

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const isEmailEmpty = email.trim() === ""
    const isPasswordEmpty = password.trim() === ""

    setEmailError(isEmailEmpty)
    setPasswordError(isPasswordEmpty)

    if (isEmailEmpty || isPasswordEmpty) return

    setError(null)

    try {
      await runWithSpan(
        "User Login",
        async () => {
          const { data, error: loginError } =
            await supabase.auth.signInWithPassword({ email, password })
          if (loginError) {
            setError(loginError.message)
            throw loginError
          }
          const token = data.session?.access_token
          if (token) sessionStorage.setItem("supabaseToken", token)
        },
        { email },
      )

      router.push("/dashboard")
    } catch {
      setError("Unexpected error occurred")
    }
  }

  const redirectToGoogleAuth = async () => {
    await runWithSpan(
      "Redirect to Google Auth",
      async () => {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        const redirectBaseUrl = process.env.NEXT_PUBLIC_REDIRECT_URL
        if (!supabaseUrl || !redirectBaseUrl)
          throw new Error("Missing env vars")

        const googleAuthUrl = `${supabaseUrl}/auth/v1/authorize?provider=google&redirect_to=${redirectBaseUrl}/dashboard`
        window.location.href = googleAuthUrl
      },
      { action: "redirect_to_google_auth" },
    )
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Green Background */}
      <div
        className="hidden lg:flex w-3/4 items-center justify-center"
        style={{
          background:
            "linear-gradient(220.11deg, #3FD24D 0%, #9CE59C 100%)",
        }}
      >
        <div className="w-[591px] h-[234px] text-left font-heading text-[96px] font-[800] tracking-[1px] text-[color:var(--secondary-900)] leading-none">
          <h1>Be</h1>
          <h1>
            Masterful<span className="ml-2 text-[40px]">🔥</span>
          </h1>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col">
        <div className="flex-1 flex justify-center px-16">
          <div className="w-full max-w-[400px] mx-auto">
            {/* Logo */}
            <div className="mt-10 text-center lg:text-left">
              <Image
                src="/logo.png"
                alt="Squad Logo"
                width={256}
                height={60}
                className="h-[60px] w-[256px] inline-block"
                priority
              />
            </div>

            {/* Login Form */}
            <h6 className="text-[20px] font-body tracking-[0.12px] font-[700] py-10 text-center lg:text-left">
              Sign in to your account
            </h6>
            <form onSubmit={handleLogin}>
              {/* Email Field */}
              <div className={emailError ? "mb-[0.6rem]" : "mb-[1.88rem]"}>
                <InputField
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={setEmail}
                  required
                  errorMessage={emailError ? "Email is required" : ""}
                  className="lg:w-[82.5%] pl-4 pr-11 py-3 font-body"
                />
              </div>

              {/* Password Field */}
              <div className="mb-7 lg:w-[82.5%]">
                <InputField
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={setPassword}
                  required
                  errorMessage={passwordError ? "Password is required" : ""}
                />
              </div>

              {/* Forgot Password & Sign In Button */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mt-[29px] mb-[9px] w-full lg:w-[83%] gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="text-[#00A600] text-[16px] font-[600] tracking-[0.15px] leading-[1.5] font-body hover:underline"
                >
                  Forgot password?
                </button>
                <Button
                  type="submit"
                  data-testid="login-button"
                  className="w-full lg:w-[150px] h-[42px] rounded-full text-black text-[14px] font-[700] tracking-[0.75px] font-heading hover:bg-[#00a41c] transition-all"
                >
                  SIGN IN
                </Button>
              </div>

              <div className="h-[20px]">
                {error && (
                  <p className="text-red-500 text-sm ml-2">
                    {error}
                  </p>
                )}
              </div>
            </form>

            {/* Google Sign In */}
            <div className="w-full flex justify-left mt-8">
              <button
                type="button"
                onClick={redirectToGoogleAuth}
                className="flex items-center justify-center gap-2 w-full lg:w-[83%] bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-full py-3 px-4 text-[15px] font-semibold font-heading text-gray-900 dark:text-white shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
              >
                <span className="flex items-center">
                  {/* Google Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <g>
                      <path
                        d="M21.805 10.023h-9.765v3.977h5.617c-.242 1.242-1.484 3.648-5.617 3.648-3.375 0-6.125-2.789-6.125-6.148 0-3.359 2.75-6.148 6.125-6.148 1.922 0 3.211.82 3.953 1.523l2.703-2.633c-1.719-1.594-3.938-2.57-6.656-2.57-5.523 0-10 4.477-10 10s4.477 10 10 10c5.75 0 9.547-4.031 9.547-9.719 0-.656-.07-1.156-.156-1.629z"
                        fill="#4285F4"
                      />
                      <path
                        d="M3.153 7.345l3.281 2.406c.891-1.781 2.578-3.008 4.606-3.008 1.125 0 2.156.391 2.953 1.031l2.703-2.633c-1.719-1.594-3.938-2.57-6.656-2.57-3.625 0-6.703 2.07-8.219 5.074z"
                        fill="#34A853"
                      />
                      <path
                        d="M12.04 22c2.672 0 4.922-.883 6.563-2.406l-3.047-2.492c-.844.57-1.922.914-3.516.914-2.859 0-5.289-1.93-6.156-4.523l-3.242 2.5c1.5 3.008 4.672 5.007 8.398 5.007z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M21.805 10.023h-9.765v3.977h5.617c-.242 1.242-1.484 3.648-5.617 3.648-3.375 0-6.125-2.789-6.125-6.148 0-.547.07-1.078.172-1.578l-3.281-2.406c-.531 1.07-.844 2.273-.844 3.584 0 5.523 4.477 10 10 10 5.75 0 9.547-4.031 9.547-9.719 0-.656-.07-1.156-.156-1.629z"
                        fill="#EA4335"
                      />
                    </g>
                  </svg>
                </span>
                <span className="flex-1 text-center">Sign in with Google</span>
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="mt-10 text-center lg:text-left lg:mt-24.5">
              <p className="text-sm lg:text-[16px] font-[600] tracking-[0.15px] font-body text-black">
                Don’t have an account yet?{" "}
                <button
                  className="text-[#00A600] font-[600] hover:underline transition-all"
                  onClick={() => {
                    window.location.href = "/signup"
                  }}
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
          <ForgotPasswordModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
/>
        </div>

        {/* Footer Links */}
        <div className="px-16 pb-8">
          <div className="max-w-[400px] mx-auto">
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm font-body text-center lg:text-left">
              <button className="text-[#00A600] lg:text-[16px] font-semibold hover:underline transition-all">
                Privacy & Terms
              </button>
              <button className="text-[#00A600] lg:text-[16px] font-semibold hover:underline transition-all">
                Help? Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
