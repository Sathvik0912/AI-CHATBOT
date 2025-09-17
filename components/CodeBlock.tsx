"use client"

import type React from "react"
import { type FC, useState } from "react"

interface CodeBlockProps {
  inline?: boolean
  className?: string
  children: React.ReactNode
}

export const CodeBlock: FC<CodeBlockProps> = ({ className, children }) => {
  const [isCopied, setIsCopied] = useState(false)
  const language = className?.replace("language-", "") || ""

  const handleCopy = () => {
    navigator.clipboard.writeText(String(children)).then(() => {
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    })
  }

  return (
    <div className="relative bg-gray-900 rounded-lg overflow-hidden border border-gray-700 my-4">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
        <span className="text-xs font-medium text-gray-300">{language.toUpperCase() || "CODE"}</span>
        <button
          onClick={handleCopy}
          className="text-xs px-3 py-1 bg-gray-700 border border-gray-600 rounded text-gray-300 hover:bg-gray-600 transition-colors"
        >
          {isCopied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="p-4">
        <pre className="text-sm text-gray-100 overflow-x-auto whitespace-pre-wrap break-words">
          <code className={`language-${language} break-words`}>{String(children).trim()}</code>
        </pre>
      </div>
    </div>
  )
}
