"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Clock, MessageSquare, Shield, UserCheck, Calculator, Play, Settings, FileText, Send } from "lucide-react"

export default function AgentWidgets() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Agent Widgets</h2>
        <p className="text-muted-foreground">Monitor and control individual agents</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Time Tracker Agent */}
        <TimeTrackerWidget />

        {/* Employee Engagement Agent */}
        <EmployeeEngagementWidget />

        {/* Work Compliance Agent */}
        <WorkComplianceWidget />

        {/* Supervisor Review Agent */}
        <SupervisorReviewWidget />

        {/* Payroll Assembly Agent */}
        <PayrollAssemblyWidget />
      </div>
    </div>
  )
}

function TimeTrackerWidget() {
  const [lastRun, setLastRun] = useState("2025-07-12T14:30:00Z")
  const [missingDays, setMissingDays] = useState(["2025-07-10", "2025-07-08"])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Time Tracker Agent
          <Badge className="bg-green-500 ml-auto">Active</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Last Run</label>
            <p className="text-sm">{new Date(lastRun).toLocaleString()}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Status</label>
            <p className="text-sm text-green-600">Monitoring</p>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">Missing Days Detected</label>
          <div className="mt-2 space-y-2">
            {missingDays.map((day) => (
              <div key={day} className="flex items-center justify-between p-2 bg-amber-50 dark:bg-amber-950 rounded">
                <span className="text-sm">{new Date(day).toLocaleDateString()}</span>
                <Badge variant="outline">Pending</Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Button size="sm" onClick={() => setLastRun(new Date().toISOString())}>
            <Play className="mr-2 h-4 w-4" />
            Re-trigger
          </Button>
          <Button size="sm" variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Configure
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function EmployeeEngagementWidget() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "Agent",
      content:
        "Hi Sarah, I noticed you haven't logged time for July 10th. Could you please confirm if you worked that day?",
      timestamp: "2025-07-12T10:30:00Z",
    },
    {
      id: "2",
      sender: "Employee",
      content: "Yes, I worked that day but forgot to log it. I was in the office from 9 AM to 5 PM.",
      timestamp: "2025-07-12T11:15:00Z",
    },
  ])
  const [newMessage, setNewMessage] = useState("")

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: Date.now().toString(),
          sender: "Supervisor",
          content: newMessage,
          timestamp: new Date().toISOString(),
        },
      ])
      setNewMessage("")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Employee Engagement Agent
          <Badge className="bg-blue-500 ml-auto">Active</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground">Active Conversations</label>
          <p className="text-2xl font-bold">3</p>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">Recent Message Thread</label>
          <ScrollArea className="h-32 mt-2 border rounded p-2">
            <div className="space-y-2">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`text-sm p-2 rounded ${
                    message.sender === "Agent"
                      ? "bg-blue-50 dark:bg-blue-950"
                      : message.sender === "Employee"
                        ? "bg-gray-50 dark:bg-gray-900"
                        : "bg-green-50 dark:bg-green-950"
                  }`}
                >
                  <div className="font-medium">{message.sender}</div>
                  <div>{message.content}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button size="sm" onClick={sendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function WorkComplianceWidget() {
  const [ragQuery, setRagQuery] = useState("")
  const [ragResults, setRagResults] = useState([
    {
      document: "Employee Handbook v2.1",
      excerpt: "Standard work hours are 8 hours per day, 40 hours per week for full-time employees.",
      relevance: 0.95,
    },
    {
      document: "Overtime Policy",
      excerpt: "Overtime must be pre-approved by direct supervisor for hours exceeding 40 per week.",
      relevance: 0.87,
    },
  ])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Work Compliance Agent
          <Badge className="bg-purple-500 ml-auto">Active</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Policies Checked</label>
            <p className="text-2xl font-bold">47</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Violations Found</label>
            <p className="text-2xl font-bold text-red-600">3</p>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">Query Policy Documents</label>
          <div className="flex gap-2 mt-2">
            <Input placeholder="Search policies..." value={ragQuery} onChange={(e) => setRagQuery(e.target.value)} />
            <Button size="sm">
              <FileText className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">Recent RAG Results</label>
          <div className="mt-2 space-y-2">
            {ragResults.map((result, index) => (
              <div key={index} className="p-2 border rounded">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{result.document}</span>
                  <Badge variant="secondary">{Math.round(result.relevance * 100)}%</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{result.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SupervisorReviewWidget() {
  const [pendingRequests, setPendingRequests] = useState([
    {
      id: "req-1",
      type: "Overtime Approval",
      employee: "Michael Chen",
      details: "14 hours on July 11th",
      status: "pending",
    },
    {
      id: "req-2",
      type: "Pattern Verification",
      employee: "Emma Thompson",
      details: "Consistent 8-hour days",
      status: "pending",
    },
  ])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCheck className="h-5 w-5" />
          Supervisor Review Agent
          <Badge className="bg-amber-500 ml-auto">Pending</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground">Pending Approvals</label>
          <p className="text-2xl font-bold">{pendingRequests.length}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">Approval Requests</label>
          <div className="mt-2 space-y-2">
            {pendingRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-2 border rounded">
                <div>
                  <div className="text-sm font-medium">{request.type}</div>
                  <div className="text-xs text-muted-foreground">
                    {request.employee} - {request.details}
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="outline">
                    Approve
                  </Button>
                  <Button size="sm" variant="outline">
                    Override
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function PayrollAssemblyWidget() {
  const [proposedEntries, setProposedEntries] = useState([
    {
      id: "entry-1",
      employee: "Sarah Johnson",
      date: "2025-07-10",
      hours: 8,
      project: "PROJ-2025",
      status: "ready",
    },
  ])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Payroll Assembly Agent
          <Badge className="bg-green-500 ml-auto">Ready</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Entries Processed</label>
            <p className="text-2xl font-bold">156</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Ready to Post</label>
            <p className="text-2xl font-bold text-green-600">{proposedEntries.length}</p>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">Proposed Entries</label>
          <div className="mt-2 space-y-2">
            {proposedEntries.map((entry) => (
              <div key={entry.id} className="p-2 border rounded">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{entry.employee}</span>
                  <Badge className="bg-green-500">Ready</Badge>
                </div>
                <div className="text-xs text-muted-foreground">
                  {entry.date} - {entry.hours}h - {entry.project}
                </div>
                <div className="flex gap-1 mt-2">
                  <Button size="sm">Post to API</Button>
                  <Button size="sm" variant="outline">
                    Override
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
