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

  const handleLogin = () => {
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Green Background */}
      <div
        className="w-1/2 flex items-center justify-center"
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
      <div className="w-1/2 bg-white flex flex-col">
        <div className="flex-1 flex justify-center px-16">
          <div className="w-full max-w-[400px] mx-auto">
            {/* Logo */}
            <div className="">
              <Image
                src="/logo.png"
                alt="Squad Logo"
                width={256}
                height={60}
                className="h-[60px] w-[256px] mt-[40px]"
                priority
              />
            </div>

            {/* Login Form */}
            <h6 className="text-[20px] font-body tracking-[0.12px] font-[700] py-[40px]">Sign in to your account</h6>
            <form className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-[46px] w-[330px] mb-[5px] px-[52px] py-[11px] pl-[16px] font-body text-[16px] font-[600] tracking-[0.15px] align-middle"
                />
                <p className="w-[314px] h-[16px] mt-[5px] ml-[16px] opacity-60 font-heading text-[12px] font-normal leading-[1.33] tracking-[0.4px] text-left text-[color:var(--black-high-emphasis)]">
                  Assistive text
                </p>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-[46px] w-[330px] mb-[5px] pl-[16px] pr-[44px] py-[11px] font-body text-[16px] font-[600] tracking-[0.15px]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-[84px] top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <p className="w-[314px] h-[16px] mt-[5px] ml-[16px] opacity-60 font-heading text-[12px] font-normal leading-[1.33] tracking-[0.4px] text-left text-[color:var(--black-high-emphasis)]">
                  Assistive text
                </p>
              </div>

              {/* Forgot Password & Sign In Button */}
              <div className="flex items-center justify-between mt-[29px] mb-[9px] w-[330px]">
                <button
                  type="button"
                  className="text-[#00B728] text-[16px] font-[600] tracking-[0.15px] leading-[1.5] font-body hover:underline"
                >
                  Forgot password?
                </button>
                <Button
                  type="button"
                  onClick={handleLogin}
                  className="w-[120px] h-[42px] rounded-full bg-[#00B728] text-black text-[14px] font-[700] tracking-[0.75px] font-heading hover:bg-[#00a41c] transition-all"
                >
                  SIGN IN
                </Button>
              </div>
            </form>

            {/* Sign Up Link */}
            <div className="mt-10">
              <p className="text-[16px] font-[600] tracking-[0.15px] font-body text-black">
                Don’t have an account yet?{" "}
                <button className="text-[#00B728] font-[600] hover:underline transition-all">
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="px-16 pb-8">
          <div className="max-w-[400px] mx-auto">
            <div className="flex gap-8 text-sm font-body">
              <button className="text-[#4CAF50] font-semibold hover:underline transition-all">Privacy & Terms</button>
              <button className="text-[#4CAF50] font-semibold hover:underline transition-all">
                Help? Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
