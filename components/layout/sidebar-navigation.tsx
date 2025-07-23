"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, AlertTriangle, FileText, Bot, GraduationCap, ChevronLeft, ChevronRight } from "lucide-react"

interface NavigationItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  badge?: number
  active?: boolean
}

interface SidebarNavigationProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export default function SidebarNavigation({ activeSection, onSectionChange }: SidebarNavigationProps) {
  const [collapsed, setCollapsed] = useState(false)

  const navigationItems: NavigationItem[] = [
    {
      id: "dashboard",
      label: "Dashboard Home",
      icon: Home,
      active: activeSection === "dashboard",
    },
    {
      id: "issues",
      label: "Issues Queue",
      icon: AlertTriangle,
      badge: 12,
      active: activeSection === "issues",
    },
    {
      id: "logs",
      label: "Agent Logs",
      icon: FileText,
      active: activeSection === "logs",
    },
    {
      id: "widgets",
      label: "Agent Widgets",
      icon: Bot,
      active: activeSection === "widgets",
    },
    {
      id: "training",
      label: "Training Console",
      icon: GraduationCap,
      active: activeSection === "training",
    },
  ]

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-slate-900 text-white transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
         {!collapsed && (
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">PayFlow</span>
                <span className="text-xs text-slate-400">Powered by ClickChain.ai</span>
              </div>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-slate-400 hover:text-white hover:bg-slate-800"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-2">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={item.active ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start text-left",
                  item.active ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800",
                  collapsed && "justify-center px-2",
                )}
                onClick={() => onSectionChange(item.id)}
              >
                <Icon className={cn("h-5 w-5", !collapsed && "mr-3")} />
                {!collapsed && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <Badge variant="destructive" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Button>
            )
          })}
        </div>
      </nav>

      {/* Status Indicator */}
      {!collapsed && (
        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>5 Agents Active</span>
          </div>
        </div>
      )}
    </div>
  )
}
