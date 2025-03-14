"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AlertTriangle, Home, Info, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const navItems = [
    {
      name: "Dashboard",
      href: "/",
      icon: Home,
    },
    {
      name: "About",
      href: "/about",
      icon: Info,
    },
    {
      name: "Extension",
      href: "/extension",
      icon: Shield,
    },
  ]

  return (
    <div className="h-screen flex flex-col bg-black border-r border-gray-800 w-64 fixed left-0 top-0">
      <div className="p-4 flex items-center gap-3">
        <AlertTriangle className="h-6 w-6 text-red-500" />
        <h1 className="text-xl font-bold text-white">SDG Misinformation</h1>
      </div>

      <nav className="mt-6 flex-1">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                    isActive ? "bg-red-500 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

