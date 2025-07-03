"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"

interface FuzzyDropdownProps {
  options: string[]
  placeholder: string
  value: string
  onChange: (value: string) => void
  className?: string
  label?: string
  isShow?: boolean
}

export function FuzzyDropdown({
  options,
  placeholder,
  value,
  onChange,
  className = "",
  label,
  isShow,
}: FuzzyDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [hydrated, setHydrated] = useState(false)

  // Ensure the component is only interactive after hydration
  useEffect(() => {
    setHydrated(true)
  }, [])

  // Keep searchTerm in sync with value prop (for controlled input)
  useEffect(() => {
    setSearchTerm(value)
  }, [value])

  // Only attach event listeners after hydration
  useEffect(() => {
    if (!hydrated) return
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [hydrated])

  const filteredOptions = hydrated
    ? options.filter((option) => option.toLowerCase().includes(searchTerm.toLowerCase()))
    : []

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setIsOpen(true)
    setHighlightedIndex(-1)
  }

  const handleOptionClick = (option: string) => {
    setSearchTerm(option)
    onChange(option)
    setIsOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        setIsOpen(true)
        return
      }
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        )
        break
      case "ArrowUp":
        e.preventDefault()
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        )
        break
      case "Enter":
        e.preventDefault()
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleOptionClick(filteredOptions[highlightedIndex])
        }
        break
      case "Escape":
        setIsOpen(false)
        inputRef.current?.blur()
        break
    }
  }

  // Prevent rendering interactive dropdown until hydrated
  if (!hydrated) {
    return (
      <div className={`relative ${className}`}>
        {label && (
          <label className="block text-[16px] text-left font-[600] text-[#5B5C5B] mb-2 font-body tracking-[0.15px]">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={value}
            readOnly
            placeholder={placeholder}
            className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg text-[16px] font-[600] text-black font-body placeholder-[#A3A4A3] focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          {isShow && (
            <ChevronDown
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#A3A4A3]"
            />
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block text-[16px] text-left font-[600] text-[#5B5C5B] mb-2 font-body tracking-[0.15px]">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg text-[16px] font-[600] text-black font-body placeholder-[#A3A4A3] focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          autoComplete="off"
        />
        {isShow && (
          <ChevronDown
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#A3A4A3] transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        )}
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={option}
                onClick={() => handleOptionClick(option)}
                className={`px-4 py-3 cursor-pointer text-gray-900 hover:bg-gray-50 ${
                  index === highlightedIndex ? "bg-green-100" : ""
                } ${option === value ? "bg-green-100" : ""}`}
              >
                {option}
              </div>
            ))
          ) : (
            <div className="px-4 py-3 text-gray-500">No options found</div>
          )}
        </div>
      )}
    </div>
  )
}
