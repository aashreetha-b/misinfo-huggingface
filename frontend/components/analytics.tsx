"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

// Sample data - in a real app, this would come from your backend
const misinformationData = [
  { name: "Jan", count: 12 },
  { name: "Feb", count: 19 },
  { name: "Mar", count: 8 },
  { name: "Apr", count: 15 },
  { name: "May", count: 23 },
  { name: "Jun", count: 17 },
]

const sentimentData = [
  { name: "Jan", positive: 65, negative: 35 },
  { name: "Feb", positive: 59, negative: 41 },
  { name: "Mar", positive: 80, negative: 20 },
  { name: "Apr", positive: 55, negative: 45 },
  { name: "May", positive: 40, negative: 60 },
  { name: "Jun", positive: 70, negative: 30 },
]

export function Analytics() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Analytics Dashboard</CardTitle>
        <CardDescription>Trends and patterns in misinformation detection</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="misinformation">
          <TabsList className="mb-4">
            <TabsTrigger value="misinformation">Misinformation</TabsTrigger>
            <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
          </TabsList>
          <TabsContent value="misinformation" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={misinformationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#ef4444" name="Misinformation Detected" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="sentiment" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sentimentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="positive" stroke="#22c55e" name="Positive Content" />
                <Line type="monotone" dataKey="negative" stroke="#ef4444" name="Negative Content" />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

