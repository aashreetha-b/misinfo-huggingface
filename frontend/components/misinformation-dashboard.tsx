"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "./layout/sidebar"
import { Header } from "./layout/header"
import { AnalysisInput } from "./analysis-input"
import { AnalysisResults } from "./analysis-results"
import { FactCheckingAssistant } from "./fact-checking-assistant"
import { AnalyticsDashboard } from "./analytics-dashboard"
import { AnalysisHistory } from "./analysis-history"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import type { AnalysisResult, HistoryItem } from "@/types/analysis"
import { Loader } from "./ui/loader"

export function MisinformationDashboard() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const { toast } = useToast()

  // Load history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("analysisHistory")
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory))
      } catch (error) {
        console.error("Failed to parse history:", error)
      }
    }
  }, [])

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("analysisHistory", JSON.stringify(history))
  }, [history])

  const handleAnalyze = async (text: string) => {
    if (!text.trim()) {
      toast({
        title: "Empty Input",
        description: "Please enter some text to analyze.",
        variant: "destructive",
      })
      return
    }

    setIsAnalyzing(true)

    try {
      const response = await fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()
      console.log("API Response:", data)

      setCurrentResult(data)

      // Calculate overall score based on sentiment and toxicity
      const overallScore = Math.round((((1 + data.sentiment) / 2) * 0.5 + data.toxicity * 0.5) * 100)
      const resultWithOverall = {
        ...data,
        overall_score: overallScore,
      }

      // Add to history
      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        text,
        result: resultWithOverall,
      }

      setHistory((prev) => [newHistoryItem, ...prev.slice(0, 19)]) // Keep only 20 most recent items

      toast({
        title: "Analysis Complete",
        description: "Your content has been analyzed successfully.",
      })
    } catch (error) {
      console.error("Analysis failed:", error)
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleClearHistory = () => {
    setHistory([])
    localStorage.removeItem("analysisHistory")
    toast({
      title: "History Cleared",
      description: "Your analysis history has been cleared.",
    })
  }

  const handleViewHistoryItem = (item: HistoryItem) => {
    setCurrentResult(item.result)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Sidebar />
      <div className="ml-64">
        <Header title="Misinformation & Hate Speech Detection" />
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <AnalysisInput onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />

              {isAnalyzing ? (
                <div className="flex justify-center items-center p-12 bg-gray-900 rounded-lg border border-gray-800">
                  <Loader />
                </div>
              ) : (
                currentResult && <AnalysisResults result={currentResult} />
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FactCheckingAssistant />
                <AnalyticsDashboard />
              </div>
            </div>

            <div className="lg:col-span-1">
              <AnalysisHistory
                history={history}
                onViewItem={handleViewHistoryItem}
                onClearHistory={handleClearHistory}
              />
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

