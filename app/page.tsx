"use client"

import { useState } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import SidebarNavigation from "@/components/layout/sidebar-navigation"
import DashboardHome from "@/components/dashboard/dashboard-home"
import IssuesQueue from "@/components/issues/issues-queue"
import AgentWidgets from "@/components/widgets/agent-widgets"
import TrainingConsole from "@/components/training/training-console"
import RecentActivity from "@/components/recent-activity"
import { Badge } from "@/components/ui/badge"
import { Bell } from "lucide-react"

export default function PayFlowDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard")

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardHome />
      case "issues":
        return <IssuesQueue />
      case "logs":
        return <RecentActivity />
      case "widgets":
        return <AgentWidgets />
      case "training":
        return <TrainingConsole />
      default:
        return <DashboardHome />
    }
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="flex h-screen bg-background">
        {/* Sidebar Navigation */}
        <SidebarNavigation activeSection={activeSection} onSectionChange={setActiveSection} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Header */}
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center justify-between px-6 py-4">
              <div>
                <h1 className="text-2xl font-bold">PayFlow Supervision Dashboard</h1>
                <p className="text-sm text-muted-foreground">Human-in-the-loop agentic payroll resolution system</p>
              </div>

              <div className="flex items-center gap-4">
                {/* Notification Badge */}
                <div className="relative">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500">
                    3
                  </Badge>
                </div>

                {/* Active Agents Indicator */}
                <div className="flex items-center gap-2 px-3 py-1 bg-green-50 dark:bg-green-950 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-green-700 dark:text-green-300">5 Agents Active</span>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="container mx-auto p-6">{renderContent()}</div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}
