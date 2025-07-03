"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const handleLogin = () => {
    const isEmailEmpty = email.trim() === ""
    const isPasswordEmpty = password.trim() === ""

    setEmailError(isEmailEmpty)
    setPasswordError(isPasswordEmpty)

    if (!isEmailEmpty && !isPasswordEmpty) {
      router.push("/dashboard")
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Green Background */}
      <div
        className="hidden lg:flex w-3/4 items-center justify-center"
        style={{
          background: "linear-gradient(220.11deg, #3FD24D 0%, #9CE59C 100%)",
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
            <h6 className="text-[20px] font-body tracking-[0.12px] font-[700] py-10 text-center lg:text-left">Sign in to your account</h6>
            <form className="">
              {/* Email Field */}
              <div className={`mb-[1.88rem]${emailError ? " mb-[1rem]" : ""}`}>
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="lg:w-[82.5%] pl-4 pr-11 py-3 font-body"

                />
                {emailError && (<p
                  className={`pt-[5px] ml-[16px] text-[12px] font-normal leading-[1.33] tracking-[0.4px] font-heading text-left ${emailError ? "text-red-500" : "opacity-60 text-[color:var(--black-high-emphasis)]"
                    }`}
                >
                  Email is required
                </p>)}
              </div>

              {/* Password Field */}
              <div className="mb-[3.12rem]">
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="lg:w-[82.5%] pl-4 pr-11 py-3 font-body"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 lg:right-[80px] top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"

                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {passwordError && (<p
                  className={`mt-[5px] ml-[16px] text-[12px] font-normal leading-[1.33] tracking-[0.4px] font-heading text-left ${passwordError ? "text-red-500" : "opacity-60 text-[color:var(--black-high-emphasis)]"
                    }`}
                >
                  Password is required
                </p>)}
              </div>

              {/* Forgot Password & Sign In Button */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mt-[29px] mb-[9px] w-full lg:w-[83%] gap-4">
                <button
                  type="button"
                  className="text-[#00A600] text-[16px] font-[600] tracking-[0.15px] leading-[1.5] font-body hover:underline"
                >
                  Forgot password?
                </button>
                <Button
                  type="button"
                  onClick={handleLogin}
                  className="w-full lg:w-[150px] h-[42px] rounded-full text-black text-[14px] font-[700] tracking-[0.75px] font-heading hover:bg-[#00a41c] transition-all"
                >
                  SIGN IN
                </Button>
              </div>
            </form>

            {/* Sign Up Link */}
            <div className="mt-10 text-center lg:text-left lg:mt-22">
              <p className="text-sm lg:text-[16px] font-[600] tracking-[0.15px] font-body text-black">
                Don’t have an account yet?{" "}
                <button className="text-[#00A600] font-[600] hover:underline transition-all">
                  Sign up
                </button>
              </p>
            </div>
          </div>
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
