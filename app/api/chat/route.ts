  import { type NextRequest, NextResponse } from "next/server"
  import { generateText } from "ai"
  import { groq } from "@ai-sdk/groq"

  export async function POST(request: NextRequest) {
    try {
      const { message } = await request.json()

      if (!message) {
        return NextResponse.json({ error: "Message is required" }, { status: 400 })
      }

      const { text } = await generateText({
        model: groq("llama-3.3-70b-versatile"),
        messages: [
          {
            role: "system",
            content: `You are AI EASY.`,
          },
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.7,
      })

      return NextResponse.json({ response: text })
    } catch (error) {
      console.error("Chat API error:", error)
      return NextResponse.json({ error: "Failed to get response" }, { status: 500 })
    }
  }
