"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { InputForm } from "@/components/input-form"
import { ResultsDisplay } from "@/components/results-display"
import { Chatbot } from "@/components/chatbot"
import { Analytics } from "@/components/analytics"
import type { AnalysisResult } from "@/services/api"

export default function Home() {
  const [results, setResults] = useState<AnalysisResult | null>(null)

  return (
    <DashboardLayout>
      <div className="grid gap-6">
        <h1 className="text-2xl font-bold tracking-tight">Misinformation & Hate Speech Detection</h1>

        <div className="grid gap-6 md:grid-cols-2">
          <InputForm onResultsChange={setResults} />
          {results && <ResultsDisplay results={results} />}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Chatbot />
          <Analytics />
        </div>
      </div>
    </DashboardLayout>
  )
}

