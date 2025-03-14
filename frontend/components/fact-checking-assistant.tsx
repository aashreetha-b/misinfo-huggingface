"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

export function FactCheckingAssistant() {
  const [question, setQuestion] = useState("")
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm your fact-checking assistant. Ask me about any information you'd like to verify.",
    },
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: question }])

    // Simulate response (in a real app, this would call an API)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "This is a placeholder response. In the future, this will connect to a fact-checking AI to provide accurate information.",
        },
      ])
    }, 1000)

    setQuestion("")
  }

  return (
    <Card className="bg-gray-900 border-gray-800 h-[400px] flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-white">Fact-Checking Assistant</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg max-w-[80%] ${
                message.role === "assistant"
                  ? "bg-gray-800 text-white self-start"
                  : "bg-red-500 text-white self-end ml-auto"
              }`}
            >
              {message.content}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            placeholder="Type your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-1 bg-gray-950 border-gray-800 text-white placeholder:text-gray-500 focus:border-red-500 focus:ring-red-500"
          />
          <Button type="submit" size="icon" className="bg-red-500 hover:bg-red-600">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

