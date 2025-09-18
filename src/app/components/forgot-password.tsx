"use client"

import { useState } from "react"
import Modal from "./ui/modal"
import { Button } from "./ui/button"
import InputField from "./ui/input-field"
import { forgotPasswordAction } from "@/lib/supabase/auth"

interface ForgotPasswordModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function ForgotPasswordModal({ isOpen, onClose }: ForgotPasswordModalProps) {
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [isSuccess, setIsSuccess] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handlePasswordReset = async () => {
        if (!email.trim()) {
          setError("Email is required")
          return
        }
        setError("")
        try {
         setIsSubmitting(true)
        
         const result = await forgotPasswordAction({ email: email.trim() })
          // Simulate password reset - replace with actual implementation
          if(result.message){
            setError(result.message || "Failed to send reset link. Try again.")
            return
          }

          console.log("Password reset for:", email)
          setIsSuccess(true)
        } catch {
          setError("Failed to send reset link. Try again.")
        } finally {
          setIsSubmitting(false)
        }
      }


    const handleClose = () => {
        setIsSuccess(false)
        setEmail("")
        setError("")
        onClose()
      }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="md" showCloseButton={false}>
            <div className="flex flex-col">
                {/* Heading */}
                {!isSuccess ? (
                    <>
                        <h2 className="text-2xl md:text-[34px] font-semibold text-[#090A09] leading-tight font-heading">Forgot password?</h2>

                        <p className="text-[#090A09] text-sm md:text-lg leading-relaxed mt-6 font-body font-medium">
                            No worries, let us help you recover it. Please enter your registered email address below.
                        </p>

                        <div className="flex flex-col mt-4">
                            <label className="text-sm font-medium text-gray-700 mb-2">
                                Email address
                            </label>
                            <InputField
                                type="email"
                                dataTestId={"email"}
                                placeholder="name@example.com"
                                value={email}
                                onChange={setEmail}
                                required
                                errorMessage={error}
                                className="h-12 rounded-lg border-gray-300 px-4 text-sm placeholder:text-gray-400 focus:border-gray-400 focus:ring-0 font-body"
                            />
                        </div>

                        <div className="">
                            <div className="flex justify-end">
                                <Button
                                    onClick={handlePasswordReset}
                                    className="h-10.5 w-35 rounded-full bg-green-500 hover:bg-green-600 text-black text-sm font-semibold tracking-wide uppercase transition-colors px-8"
                                    isLoading={isSubmitting}
                                >
                                    RESET
                                </Button>
                            </div>
                        </div>

                    </>
                ) : (
                    <>
                        <h2 className="text-2xl md:text-[34px] font-semibold text-[#090A09] leading-tight font-heading">Request sent!</h2>

                        <p className="text-[#090A09] text-sm md:text-lg leading-relaxed mt-6 font-body font-medium">
                            If this account exists, an email will be sent with further instructions.
                        </p>

                        <div className="mt-[30px]">
                            <div className="flex justify-end">
                                <Button
                                    onClick={handleClose}
                                    className="h-10.5 w-35 rounded-full bg-green-500 hover:bg-green-600 text-black text-sm font-semibold tracking-wide uppercase transition-colors px-8"
                                >
                                    OKAY
                                </Button>
                            </div>
                        </div>
                    </>
                )

                }

            </div>
    </Modal >
  )
}
