"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { AlertTriangle, Home, Info, Shield, Zap } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const navigation = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "About", href: "/about", icon: Info },
    { name: "Extension", href: "/extension", icon: Shield },
  ]

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden border-r bg-muted/40 md:block md:w-64 lg:w-72">
        <div className="flex h-full flex-col">
          <div className="flex h-14 items-center border-b px-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <span>SDG Misinformation</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-2 text-sm font-medium">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                      isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
          <div className="border-t p-4">
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 md:px-6">
          <div className="md:hidden">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <span>SDG Misinformation</span>
            </Link>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Zap className="mr-2 h-4 w-4" />
              API Status
            </Button>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

