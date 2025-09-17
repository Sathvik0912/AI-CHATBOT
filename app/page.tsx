"use client"

import React, { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { CodeBlock } from "@/components/CodeBlock"
import type { Message } from "@/types/chat"

// Optional props for code blocks
interface CodeProps {
  node?: any
  inline?: boolean
  className?: string
  children?: React.ReactNode
  [key: string]: any
}

export default function ChatApp() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! It's nice to meet you. Is there something I can help you with or would you like to chat?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input.trim() }),
      })

      if (!response.ok) throw new Error("Failed to send message")

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600">
      <div className="max-w-4xl mx-auto h-screen flex flex-col p-4">
        {/* Header */}
        <div className="text-center mb-6 pt-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-white/80">Ready</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">AI EASY</h1>
          <p className="text-white/80">Your Personal AI Assistant</p>
        </div>

        {/* Chat Container */}
        <Card className="flex-1 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div key={message.id} className="animate-fadeIn">
                <div
                  className={`flex gap-3 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                      H
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] ${
                      message.role === "user" ? "order-first" : ""
                    }`}
                  >
                    {message.role === "user" ? (
                      <div className="bg-blue-500 text-white px-4 py-2 rounded-2xl rounded-tr-sm">
                        {message.content}
                      </div>
                    ) : (
                      <div className="prose prose-sm max-w-none">
                        <ReactMarkdown
                          components={{
                            code: (({ node, inline, className, children, ...props }: CodeProps) => {
                              const match = /language-(\w+)/.exec(className || "")
                              const codeString = String(children).replace(/\n$/, "")

                              return !inline && match ? (
                                <CodeBlock className={className}>{codeString}</CodeBlock>
                              ) : (
                                <code
                                  className="bg-gray-100 px-1 py-0.5 rounded text-sm"
                                  {...props}
                                >
                                  {children}
                                </code>
                              )
                            }) as React.FC<any>,
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>

                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                      U
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 animate-fadeIn">
                <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-semibold text-sm">
                  H
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-100 p-4">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message to AI EASY..."
                disabled={isLoading}
                className="flex-1 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
              />
              <Button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="bg-purple-500 hover:bg-purple-600 text-white px-4"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
