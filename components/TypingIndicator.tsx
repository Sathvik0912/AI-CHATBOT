import type React from "react"

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex gap-3 animate-fadeIn">
      <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-red-500 text-white font-semibold text-sm">
        H
      </div>
      <div className="bg-gray-50 rounded-2xl rounded-bl-md p-4">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>
      </div>
    </div>
  )
}
