"use client"

import { CheckCircle, XCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// Make sure the interface matches our API response
interface AnalysisResult {
  analysis: string
  score: number
  sentiment: number
  toxicity: number
}

export function ResultsDisplay({ results }: { results: AnalysisResult | null }) {
  if (!results) return null

  const isClean = results.analysis.includes("Clean")

  return (
    <Card className={`w-full border-l-4 ${isClean ? "border-l-green-500" : "border-l-red-500"}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          {isClean ? (
            <>
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Content is Clean</span>
            </>
          ) : (
            <>
              <XCircle className="h-5 w-5 text-red-500" />
              <span>Hate/Misinformation Detected</span>
            </>
          )}
        </CardTitle>
        <CardDescription>Analysis results with confidence scores</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="font-medium">Overall Score</span>
              <span className="text-muted-foreground">{(results.score * 100).toFixed(1)}%</span>
            </div>
            <Progress
              value={results.score * 100}
              className={`h-2 ${results.score > 0.5 ? "bg-red-100" : "bg-green-100"}`}
            />
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="font-medium">Sentiment Analysis</span>
              <span className="text-muted-foreground">
                {results.sentiment >= 0 ? "Positive" : "Negative"} ({results.sentiment.toFixed(2)})
              </span>
            </div>
            <Progress value={(results.sentiment + 1) * 50} className="h-2 bg-blue-100" />
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="font-medium">Toxicity Score</span>
              <span className="text-muted-foreground">{(results.toxicity * 100).toFixed(1)}%</span>
            </div>
            <Progress
              value={results.toxicity * 100}
              className={`h-2 ${results.toxicity > 0.5 ? "bg-red-100" : "bg-green-100"}`}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

