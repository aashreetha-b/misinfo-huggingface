import type React from "react"
import { cn } from "@/lib/utils"

interface StepsProps {
  children: React.ReactNode
  className?: string
}

export function Steps({ children, className }: StepsProps) {
  return <div className={cn("space-y-4", className)}>{children}</div>
}

interface StepItemProps {
  title: string
  children: React.ReactNode
  className?: string
}

export function StepItem({ title, children, className }: StepItemProps) {
  return (
    <div className={cn("grid grid-cols-[2rem_1fr] gap-4", className)}>
      <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-background text-center font-medium">
        {/* This would be the step number in a real implementation */}
        <span className="text-sm"></span>
      </div>
      <div className="space-y-1">
        <h4 className="font-medium leading-none">{title}</h4>
        <p className="text-sm text-muted-foreground">{children}</p>
      </div>
    </div>
  )
}

