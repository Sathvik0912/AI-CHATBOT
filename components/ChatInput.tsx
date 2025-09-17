"use client"

import { useState, useRef, useEffect, type KeyboardEvent } from "react"

interface GrowingTextareaProps {
  placeholder?: string
  disabled?: boolean
  onSubmit?: (value: string) => void
}

export const GrowingTextarea: React.FC<GrowingTextareaProps> = ({
  placeholder = "Type something...",
  disabled = false,
  onSubmit,
}) => {
  const [value, setValue] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto resize vertically only
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto" // reset
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px" // grow vertically
    }
  }, [value])

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (value.trim()) {
        onSubmit?.(value.trim())
        setValue("")
      }
    }
  }

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full p-3 border border-gray-300 rounded-lg resize-none 
                 focus:outline-none focus:ring-2 focus:ring-purple-500 
                 disabled:opacity-50 disabled:cursor-not-allowed overflow-y-auto"
      style={{
        minHeight: "44px",
        maxHeight: "200px", // stop at 200px then scroll
        height: "44px", // base height
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        overflowWrap: "break-word",
        lineHeight: "1.5",
      }}
    />
  )
}
