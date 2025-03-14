"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { HistoryItem } from "@/types/analysis"
import { formatDistanceToNow } from "date-fns"
import { Trash2 } from "lucide-react"

interface AnalysisHistoryProps {
  history: HistoryItem[]
  onViewItem: (item: HistoryItem) => void
  onClearHistory: () => void
}

export function AnalysisHistory({ history, onViewItem, onClearHistory }: AnalysisHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredHistory = searchTerm
    ? history.filter(
        (item) =>
          item.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.result.fact_check.claim.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : history

  // Helper function to determine meta score color
  const getMetaScoreColor = (score: string) => {
    switch (score.toLowerCase()) {
      case "low":
        return "bg-green-500 text-white"
      case "medium":
        return "bg-yellow-500 text-white"
      case "high":
        return "bg-red-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <Card className="bg-gray-900 border-gray-800 h-full">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg text-white">Analysis History</CardTitle>
        {history.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearHistory}
            className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search history..."
            className="w-full px-3 py-2 rounded-md border border-gray-800 bg-gray-950 text-white placeholder:text-gray-500 focus:border-red-500 focus:ring-red-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              onClick={() => setSearchTerm("")}
            >
              ✕
            </button>
          )}
        </div>

        {filteredHistory.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            {history.length === 0
              ? "No analysis history yet. Analyze some content to see it here."
              : "No matching results found."}
          </div>
        ) : (
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-3">
              {filteredHistory.map((item) => (
                <div
                  key={item.id}
                  className="p-3 border border-gray-800 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors"
                  onClick={() => onViewItem(item)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium text-white line-clamp-1">{item.result.fact_check.claim}</p>
                    <Badge className={getMetaScoreColor(item.result.meta_score)}>{item.result.meta_score}</Badge>
                  </div>
                  <p className="text-sm text-gray-400 line-clamp-2 mb-1">{item.text}</p>
                  <p className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}

