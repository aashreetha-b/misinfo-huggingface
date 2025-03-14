"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

interface AnalysisInputProps {
  onAnalyze: (text: string) => void
  isAnalyzing: boolean
}

export function AnalysisInput({ onAnalyze, isAnalyzing }: AnalysisInputProps) {
  const [inputText, setInputText] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAnalyze(inputText)
  }

  const handleClear = () => {
    setInputText("")
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl text-white">Content Analysis</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Enter text or paste URL here..."
            className="min-h-[150px] resize-none bg-gray-950 border-gray-800 text-white placeholder:text-gray-500 focus:border-red-500 focus:ring-red-500"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isAnalyzing}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isAnalyzing || !inputText.trim()}
              className="bg-red-500 hover:bg-red-600 text-white w-full"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Analyze Text"
              )}
            </Button>
          </div>
        </CardContent>
      </form>
    </Card>
  )
}

