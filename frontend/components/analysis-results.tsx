"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { AnalysisResult } from "@/types/analysis"
import { AlertTriangle, CheckCircle, Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AnalysisResultsProps {
  result: AnalysisResult
}

export function AnalysisResults({ result }: AnalysisResultsProps) {
  const { toast } = useToast()

  // Calculate overall score if not provided
  const overallScore =
    result.overall_score || Math.round((((1 + result.sentiment) / 2) * 0.5 + result.toxicity * 0.5) * 100)

  // Convert toxicity to percentage
  const toxicityPercentage = Math.round(result.toxicity * 100)

  // Convert sentiment to percentage for display (-1 to 1 becomes 0 to 100)
  const sentimentPercentage = Math.round(((result.sentiment + 1) / 2) * 100)

  const handleCopyResults = () => {
    const resultText = `
Misinformation Analysis Results:
------------------------------
Overall Score: ${overallScore}%
Sentiment Score: ${result.sentiment.toFixed(2)}
Toxicity Score: ${toxicityPercentage}%

Fact Check:
  Claim: ${result.fact_check.claim}
  Source: ${result.fact_check.source}
  Verdict: ${result.fact_check.verdict}

${result.feedback}
    `

    navigator.clipboard.writeText(resultText.trim())
    toast({
      title: "Copied to Clipboard",
      description: "Analysis results have been copied to your clipboard.",
    })
  }

  // Helper function to determine verdict color
  const getVerdictColor = (verdict: string) => {
    switch (verdict.toLowerCase()) {
      case "true":
        return "bg-green-500 text-white"
      case "mixed":
        return "bg-yellow-500 text-white"
      case "false":
        return "bg-red-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <Card className="bg-gray-900 border-gray-800 overflow-hidden">
      <div className="border-l-4 border-red-500">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-white flex justify-between items-center">
            <span>Hate/Misinformation Detected</span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyResults}
              className="border-gray-700 text-gray-300 hover:text-white"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Results
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Feedback Notice */}
          <div
            className={`p-3 rounded-md flex items-center gap-3 ${
              result.meta_score === "low"
                ? "bg-green-900/20 text-green-400 border border-green-800"
                : "bg-red-900/20 text-red-400 border border-red-800"
            }`}
          >
            {result.meta_score === "low" ? (
              <CheckCircle className="h-5 w-5 flex-shrink-0" />
            ) : (
              <AlertTriangle className="h-5 w-5 flex-shrink-0" />
            )}
            <p className="font-medium">{result.feedback}</p>
          </div>

          {/* Overall Score */}
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-300">Overall Score: {overallScore}%</span>
            </div>
            <Progress
              value={overallScore}
              className="h-2 bg-gray-800"
              indicatorClassName={`${
                overallScore > 70 ? "bg-red-500" : overallScore > 30 ? "bg-yellow-500" : "bg-green-500"
              }`}
            />
          </div>

          {/* Sentiment Score */}
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-300">Sentiment Score: {result.sentiment.toFixed(2)}</span>
            </div>
            <Progress value={sentimentPercentage} className="h-2 bg-gray-800" indicatorClassName="bg-blue-500" />
          </div>

          {/* Toxicity Score */}
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-300">Toxicity Score: {toxicityPercentage}%</span>
            </div>
            <Progress
              value={toxicityPercentage}
              className="h-2 bg-gray-800"
              indicatorClassName={`${
                toxicityPercentage > 70 ? "bg-red-500" : toxicityPercentage > 30 ? "bg-yellow-500" : "bg-green-500"
              }`}
            />
          </div>

          {/* Fact Check */}
          <div className="mt-4 pt-4 border-t border-gray-800">
            <h3 className="text-lg font-medium text-white mb-2">Fact Check</h3>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-gray-400">Claim:</span>
                <p className="text-white">{result.fact_check.claim}</p>
              </div>
              <div>
                <span className="text-sm text-gray-400">Source:</span>
                <p className="text-white">{result.fact_check.source}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Verdict:</span>
                <Badge className={getVerdictColor(result.fact_check.verdict)}>{result.fact_check.verdict}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

