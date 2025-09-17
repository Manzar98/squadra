"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"

interface Option {
  id: string;
  name: string;
}

interface EnhancedFuzzyDropdownProps {
  options: Option[]
  placeholder: string
  value: string // This will be the ID
  onChange: (id: string) => void
  className?: string
  label?: string
  isShow?: boolean
  displayValue?: string // Optional display value override
}

export function EnhancedFuzzyDropdown({
  options,
  placeholder,
  value,
  onChange,
  className = "",
  label,
  displayValue,
}: EnhancedFuzzyDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Get display name for the current value
  const getDisplayName = (id: string) => {
    if (displayValue) return displayValue;
    const option = options.find(opt => opt.id === id);
    return option ? option.name : "";
  };

  // Filter options based on search term
  const filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value
    setSearchTerm(newSearchTerm)
    setHighlightedIndex(-1)
    
    // If user is typing, open dropdown
    if (newSearchTerm && !isOpen) {
      setIsOpen(true)
    }
  }

  // Handle option selection
  const handleOptionSelect = (option: Option) => {
    onChange(option.id)
    setSearchTerm("")
    setIsOpen(false)
    setHighlightedIndex(-1)
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === "ArrowDown") {
        setIsOpen(true)
        setHighlightedIndex(0)
      }
      return
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setHighlightedIndex(prev => 
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        )
        break
      case "ArrowUp":
        e.preventDefault()
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        )
        break
      case "Enter":
        e.preventDefault()
        if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
          handleOptionSelect(filteredOptions[highlightedIndex])
        }
        break
      case "Escape":
        setIsOpen(false)
        setHighlightedIndex(-1)
        setSearchTerm("")
        break
    }
  }

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setIsOpen(false)
        setSearchTerm("")
        setHighlightedIndex(-1)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block text-[16px] text-left font-[600] text-[#5B5C5B] mb-2 font-body">
          {label}
        </label>
      )}
      
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm || getDisplayName(value)}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (filteredOptions.length > 0) {
              setIsOpen(true)
            }
          }}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={option.id}
                onClick={() => handleOptionSelect(option)}
                className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                  index === highlightedIndex ? 'bg-green-100' : ''
                }`}
              >
                {option.name}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-gray-500">
              No options found
            </div>
          )}
        </div>
      )}
    </div>
  )
}
