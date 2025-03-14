"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { AnalysisResult } from "@/types/analysis"
import { AlertTriangle, CheckCircle, Copy, ExternalLink } from "lucide-react"
import { Loader } from "./loader"
import { useToast } from "@/hooks/use-toast"

interface ExtensionViewProps {
  onAnalyze: (text: string) => void
  result: AnalysisResult | null
  isAnalyzing: boolean
}

export function ExtensionView({ onAnalyze, result, isAnalyzing }: ExtensionViewProps) {
  const [inputText, setInputText] = useState("")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAnalyze(inputText)
  }

  const handleCopyResults = () => {
    if (!result) return

    const resultText = `
Misinformation Analysis:
Verdict: ${result.fact_check.verdict}
Risk Level: ${result.meta_score.toUpperCase()}
Sentiment: ${result.sentiment.toFixed(2)}
Toxicity: ${(result.toxicity * 100).toFixed(1)}%
${result.feedback}
    `

    navigator.clipboard.writeText(resultText.trim())
    toast({
      title: "Copied to Clipboard",
      description: "Analysis results have been copied.",
    })
  }

  // Helper function to determine meta score color
  const getMetaScoreColor = (score: string) => {
    switch (score.toLowerCase()) {
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  // Helper function to determine verdict color
  const getVerdictColor = (verdict: string) => {
    switch (verdict.toLowerCase()) {
      case "true":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "mixed":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "false":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="max-w-md mx-auto border rounded-lg shadow-lg overflow-hidden">
      <div className="bg-primary p-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-primary-foreground" />
          <h2 className="text-lg font-semibold text-primary-foreground">Misinformation Detector</h2>
        </div>
        <Button variant="ghost" size="icon" className="text-primary-foreground">
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Enter text or paste URL to analyze..."
            className="min-h-[100px] resize-none"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isAnalyzing}
          />
          <Button type="submit" disabled={isAnalyzing || !inputText.trim()} className="w-full">
            {isAnalyzing ? "Analyzing..." : "Analyze Content"}
          </Button>
        </form>

        {isAnalyzing ? (
          <div className="flex justify-center items-center p-8">
            <Loader />
          </div>
        ) : result ? (
          <Card className="mt-4">
            <CardContent className="p-4 space-y-4">
              {/* Feedback Notice */}
              <div
                className={`p-3 rounded-lg flex items-center gap-2 text-sm ${
                  result.meta_score === "low"
                    ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                    : "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                }`}
              >
                {result.meta_score === "low" ? (
                  <CheckCircle className="h-4 w-4 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                )}
                <p className="font-medium">{result.feedback}</p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-2">
                <div className="border rounded p-2">
                  <div className="text-xs text-muted-foreground mb-1">Verdict</div>
                  <Badge className={getVerdictColor(result.fact_check.verdict)}>{result.fact_check.verdict}</Badge>
                </div>
                <div className="border rounded p-2">
                  <div className="text-xs text-muted-foreground mb-1">Risk Level</div>
                  <Badge className={getMetaScoreColor(result.meta_score)}>{result.meta_score.toUpperCase()}</Badge>
                </div>
              </div>

              {/* Toxicity Bar */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Toxicity</span>
                  <span>{(result.toxicity * 100).toFixed(1)}%</span>
                </div>
                <Progress
                  value={result.toxicity * 100}
                  className="h-2"
                  indicatorClassName={`${
                    result.toxicity > 0.7 ? "bg-red-500" : result.toxicity > 0.3 ? "bg-yellow-500" : "bg-green-500"
                  }`}
                />
              </div>

              {/* Source */}
              <div className="text-sm">
                <span className="font-medium">Source: </span>
                <span className="text-muted-foreground">{result.fact_check.source}</span>
              </div>

              <div className="flex justify-end">
                <Button variant="outline" size="sm" onClick={handleCopyResults}>
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  )
}

