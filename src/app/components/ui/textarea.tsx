import type React from "react"
import { forwardRef } from "react"

const TextArea = forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className = "", ...props }, ref) => {
    return (
      <textarea
        className={`w-full border border-[#19191952] rounded-xl text-base placeholder:text-Secondary-400 placeholder:text-[16px] focus:outline-none focus:border-[#7ED321] focus:ring-1 focus:ring-[#7ED321] transition-colors ${className} text-[16px] font-[600] tracking-[0.15px] align-middle`}
        ref={ref}
        {...props}
      />
    )
  }
)

TextArea.displayName = "TextArea"

export { TextArea } 