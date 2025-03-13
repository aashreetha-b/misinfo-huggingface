"use client"

import { useState } from "react"
import { analyzeText, AnalysisResult } from "@/services/api"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"

export function InputForm({ onResultsChange }: { onResultsChange: (results: AnalysisResult | null) => void }) {
  const [text, setText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!text.trim()) {
      toast({
        title: "Empty input",
        description: "Please enter some text to analyze.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setError(null)
    onResultsChange(null)

    try {
      const result = await analyzeText(text.trim())
      onResultsChange(result)
    } catch (err) {
      console.error("Error analyzing text:", err)
      setError("Failed to analyze text. Please try again later.")
      toast({
        title: "Analysis failed",
        description: "Could not connect to the analysis server.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full p-4 border rounded-lg shadow-md">
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <Textarea
          placeholder="Enter text to analyze..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading} className="mt-2 w-full">
          {isLoading ? "Analyzing..." : "Analyze Text"}
        </Button>
      </form>
    </div>
  )
}
