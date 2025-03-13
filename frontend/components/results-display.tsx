"use client"

import { AnalysisResult } from "@/services/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function ResultsDisplay({ results }: { results: AnalysisResult | null }) {
  if (!results) return null

  return (
    <Card className={`w-full border-l-4 ${results.analysis.includes("Clean") ? "border-l-green-500" : "border-l-red-500"}`}>
      <CardHeader>
        <CardTitle>{results.analysis}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Overall Score: {Math.round(results.score * 100)}%</p>
        <Progress value={results.score * 100} />

        <p>Sentiment Score: {results.sentiment.toFixed(2)}</p>
        <Progress value={(results.sentiment + 1) * 50} />

        <p>Toxicity Score: {Math.round(results.toxicity * 100)}%</p>
        <Progress value={results.toxicity * 100} />
      </CardContent>
    </Card>
  )
}
