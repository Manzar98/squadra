"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"

interface DropdownProps {
  trigger: React.ReactNode
  children: React.ReactNode
  align?: "left" | "right"
}

export function CustomDropdown({ trigger, children, align = "right" }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      {isOpen && (
        <div
          className={`absolute top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50 ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {children}
        </div>
      )}
    </div>
  )
}

interface DropdownItemProps {
  onClick?: () => void
  children: React.ReactNode
  className?: string
  variant?: "default" | "danger" | "success"
}

export function DropdownItem({ onClick, children, className = "", variant = "default" }: DropdownItemProps) {
  const variantClasses = {
    default: "hover:bg-green-50 text-black",
    danger: "hover:bg-red-50 text-red-600",
    success: "hover:bg-green-50 text-green-700",
  }

  return (
    <div
      onClick={onClick}
      className={`px-4 py-2 cursor-pointer transition-colors ${variantClasses[variant]} ${className}`}
    >
      {children}
    </div>
  )
}

export function DropdownSeparator() {
  return <div className="border-t border-gray-200 my-1" />
}
