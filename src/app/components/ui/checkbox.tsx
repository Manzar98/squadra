"use client"

import type React from "react"
import { forwardRef } from "react"
import { Check } from "lucide-react"

interface CheckboxProps {
  id?: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  className?: string
  children?: React.ReactNode
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ id, checked = false, onCheckedChange, disabled = false, className = "", children }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onCheckedChange) {
        onCheckedChange(event.target.checked)
      }
    }

    return (
      <div className="flex items-center space-x-2">
        <div className="relative">
          <input
            ref={ref}
            id={id}
            type="checkbox"
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            className="sr-only"
          />
          <div
            className={`
              w-4 h-4 border-2 rounded cursor-pointer transition-all duration-200 flex items-center justify-center
              ${checked ? "bg-green-500 border-green-500" : "bg-white border-gray-300 hover:border-gray-400"}
              ${disabled ? "opacity-50 cursor-not-allowed" : ""}
              ${className}
            `}
            onClick={() => !disabled && onCheckedChange && onCheckedChange(!checked)}
          >
            {checked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
          </div>
        </div>
        {children && (
          <label htmlFor={id} className={`text-sm cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}>
            {children}
          </label>
        )}
      </div>
    )
  },
)

Checkbox.displayName = "Checkbox"
