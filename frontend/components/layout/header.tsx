"use client"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Zap } from "lucide-react"

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="border-b border-gray-800 bg-black py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-white">{title}</h1>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" className="gap-2 border-gray-700 text-gray-300 hover:text-white">
          <Zap className="h-4 w-4" />
          API Status
        </Button>
        <ThemeToggle />
      </div>
    </header>
  )
}

