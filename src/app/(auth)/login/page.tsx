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
        <div className="text-center">
          <h1 className="text-[96px] font-[800] text-[#2D2D2D] leading-tight text-left font-heading tracking-[1px] leading-7">
            Be
          </h1>
          <h1 className="text-[96px] font-[800] text-[#2D2D2D] leading-tight font-heading tracking-[1px] leading-7">
            Masterful
            <span className="ml-2 text-5xl">🔥</span>
          </h1>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-1/2 bg-white flex flex-col">
        <div className="flex-1 flex justify-center px-16">
          <div className="w-full max-w-[400px] mx-auto">
            {/* Logo */}
            <div className="mb-10">
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
            <h2 className="text-[28px] font-semibold text-black mb-10 leading-tight">Sign in to your account</h2>

            <form className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 text-base border-gray-300 rounded-lg px-4"
                />
                <p className="text-xs text-gray-400 ml-1">Assistive text</p>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 text-base border-gray-300 rounded-lg px-4 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <p className="text-xs text-gray-400 ml-1">Assistive text</p>
              </div>

              {/* Forgot Password & Sign In Button */}
              <div className="flex items-center justify-between pt-4">
                <button type="button" className="text-[#4CAF50] text-sm font-medium hover:underline transition-all">
                  Forgot password?
                </button>
                <Button
                  type="button"
                  onClick={handleLogin}
                  className="w-[150px] h-[42px] rounded-[200px] bg-[#4CAF50] text-[14px] font-[700] hover:bg-[#45a049] text-black px-8 py-3 rounded-full tracking-[0.75px]"
                >
                  SIGN IN
                </Button>
              </div>
            </form>

            {/* Sign Up Link */}
            <div className="mt-10">
              <p className="text-[16px] font-[600] text-gray-600 tracking-[0.15px]">
                {"Don't have an account yet? "}
                <button className="text-[#4CAF50] font-medium hover:underline transition-all">Sign up</button>
              </p>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="px-16 pb-8">
          <div className="max-w-[400px] mx-auto">
            <div className="flex gap-8 text-sm">
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
