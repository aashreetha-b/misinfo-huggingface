"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Point {
  x: number
  y: number
  month: string
}

interface TooltipData {
  x: number
  y: number
  positive?: number
  negative?: number
  misinformation?: number
}

export function AnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState("misinformation")
  const [tooltipData, setTooltipData] = useState<TooltipData | null>(null)
  const [hoveredPoint, setHoveredPoint] = useState<Point | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Mock data
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
  const sentimentData = {
    positive: [62, 60, 82, 58, 40, 70],
    negative: [38, 40, 18, 42, 60, 30],
  }
  const misinformationData = [12, 19, 8, 23, 15, 17]

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const dpr = window.devicePixelRatio || 1
    const rect = container.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`
    ctx.scale(dpr, dpr)

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    const padding = 40
    const chartWidth = rect.width - padding * 2
    const chartHeight = rect.height - padding * 2

    ctx.strokeStyle = "#2a2a2a"
    ctx.lineWidth = 1

    // Draw horizontal grid lines
    for (let i = 0; i <= 4; i++) {
      const y = padding + (chartHeight * i) / 4
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(rect.width - padding, y)
      ctx.stroke()
    }

    // Draw vertical grid lines
    for (let i = 0; i < months.length; i++) {
      const x = padding + (chartWidth * i) / (months.length - 1)
      ctx.beginPath()
      ctx.moveTo(x, padding)
      ctx.lineTo(x, rect.height - padding)
      ctx.stroke()

      // Draw month labels
      ctx.fillStyle = "#666"
      ctx.font = "12px Inter"
      ctx.textAlign = "center"
      ctx.fillText(months[i], x, rect.height - padding / 2)
    }

    // Draw y-axis labels
    ctx.textAlign = "right"
    for (let i = 0; i <= 4; i++) {
      const y = padding + (chartHeight * i) / 4
      const value = 80 - i * 20
      ctx.fillText(value.toString(), padding - 10, y + 4)
    }

    if (activeTab === "sentiment") {
      // Draw sentiment lines
      const drawLine = (data: number[], color: string) => {
        ctx.beginPath()
        ctx.strokeStyle = color
        ctx.lineWidth = 2

        data.forEach((value, i) => {
          const x = padding + (chartWidth * i) / (data.length - 1)
          const y = padding + chartHeight - (chartHeight * value) / 80

          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        })

        ctx.stroke()

        // Draw points
        data.forEach((value, i) => {
          const x = padding + (chartWidth * i) / (data.length - 1)
          const y = padding + chartHeight - (chartHeight * value) / 80

          ctx.beginPath()
          ctx.arc(x, y, 4, 0, Math.PI * 2)
          ctx.fillStyle = color
          ctx.fill()
        })
      }

      drawLine(sentimentData.positive, "#22c55e")
      drawLine(sentimentData.negative, "#ef4444")
    } else {
      // Draw misinformation bars
      const barWidth = chartWidth / (months.length * 2)

      misinformationData.forEach((value, i) => {
        const x = padding + (chartWidth * i) / (months.length - 1) - barWidth / 2
        const height = (chartHeight * value) / 24
        const y = rect.height - padding - height

        ctx.fillStyle = hoveredPoint?.month === months[i] ? "#ff6b6b" : "#ef4444"

        ctx.fillRect(x, y, barWidth, height)
      })
    }
  }, [activeTab, hoveredPoint])

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const padding = 40
    const chartWidth = rect.width - padding * 2
    const chartHeight = rect.height - padding * 2

    if (activeTab === "sentiment") {
      // Find closest point on either line
      let closestPoint: Point | null = null
      let minDistance = Number.POSITIVE_INFINITY

      const checkPoints = (data: number[], isPositive: boolean) => {
        data.forEach((value, i) => {
          const px = padding + (chartWidth * i) / (data.length - 1)
          const py = padding + chartHeight - (chartHeight * value) / 80

          const distance = Math.sqrt(Math.pow(x - px, 2) + Math.pow(y - py, 2))
          if (distance < minDistance && distance < 20) {
            minDistance = distance
            closestPoint = { x: px, y: py, month: months[i] }
            setTooltipData({
              x: px,
              y: py,
              positive: isPositive ? value : sentimentData.positive[i],
              negative: !isPositive ? value : sentimentData.negative[i],
            })
          }
        })
      }

      checkPoints(sentimentData.positive, true)
      checkPoints(sentimentData.negative, false)
      setHoveredPoint(closestPoint)
    } else {
      // Find closest bar
      const barWidth = chartWidth / (months.length * 2)

      misinformationData.forEach((value, i) => {
        const bx = padding + (chartWidth * i) / (months.length - 1) - barWidth / 2
        const height = (chartHeight * value) / 24
        const by = rect.height - padding - height

        if (x >= bx && x <= bx + barWidth && y >= by && y <= rect.height - padding) {
          setHoveredPoint({ x: bx + barWidth / 2, y: by, month: months[i] })
          setTooltipData({
            x: bx + barWidth / 2,
            y: by,
            misinformation: value,
          })
        }
      })
    }
  }

  const handleMouseLeave = () => {
    setHoveredPoint(null)
    setTooltipData(null)
  }

  return (
    <Card className="bg-gray-900 border-gray-800 h-[400px]">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-white">Analytics Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="misinformation" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4 bg-gray-800">
            <TabsTrigger
              value="misinformation"
              className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
            >
              Misinformation
            </TabsTrigger>
            <TabsTrigger value="sentiment" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
              Sentiment
            </TabsTrigger>
          </TabsList>

          <div ref={containerRef} className="relative h-[280px]">
            <canvas
              ref={canvasRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="absolute inset-0"
            />

            {tooltipData && (
              <div
                className="absolute z-10 bg-white dark:bg-gray-800 p-2 rounded shadow-lg text-sm pointer-events-none"
                style={{
                  left: `${tooltipData.x}px`,
                  top: `${tooltipData.y - 60}px`,
                  transform: "translateX(-50%)",
                }}
              >
                {activeTab === "sentiment" ? (
                  <>
                    <div className="text-green-500">Positive Content: {tooltipData.positive}%</div>
                    <div className="text-red-500">Negative Content: {tooltipData.negative}%</div>
                  </>
                ) : (
                  <div className="text-red-500">Misinformation Detected: {tooltipData.misinformation}</div>
                )}
              </div>
            )}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}

