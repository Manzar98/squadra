import type React from "react"
import { forwardRef } from "react"

const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className = "", type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        className={`w-full h-12 px-4 border border-gray-300 rounded-lg text-base placeholder:text-gray-400 focus:outline-none focus:border-[#7ED321] focus:ring-1 focus:ring-[#7ED321] transition-colors ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export { Input }
