"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, FileText, Plus, Trash2, Tag, Brain } from "lucide-react"

interface PolicyDocument {
  id: string
  name: string
  type: "pdf" | "markdown"
  uploadDate: string
  size: string
  status: "processed" | "processing" | "error"
}

interface PromptExample {
  id: string
  title: string
  input: string
  expectedOutput: string
  tags: string[]
  category: string
}

export default function TrainingConsole() {
  const [policyDocuments, setPolicyDocuments] = useState<PolicyDocument[]>([
    {
      id: "doc-1",
      name: "Employee Handbook v2.1.pdf",
      type: "pdf",
      uploadDate: "2025-07-10",
      size: "2.3 MB",
      status: "processed",
    },
    {
      id: "doc-2",
      name: "Overtime Policy.md",
      type: "markdown",
      uploadDate: "2025-07-11",
      size: "45 KB",
      status: "processed",
    },
    {
      id: "doc-3",
      name: "Time Tracking Guidelines.pdf",
      type: "pdf",
      uploadDate: "2025-07-12",
      size: "1.8 MB",
      status: "processing",
    },
  ])

  const [promptExamples, setPromptExamples] = useState<PromptExample[]>([
    {
      id: "example-1",
      title: "Missing Time Entry Detection",
      input: "Employee has entries for Monday and Wednesday but not Tuesday",
      expectedOutput: "Detect missing entry for Tuesday and suggest standard 8-hour workday",
      tags: ["missing-entry", "detection"],
      category: "time-tracking",
    },
    {
      id: "example-2",
      title: "Overtime Validation",
      input: "Employee logged 14 hours on Friday",
      expectedOutput: "Flag for supervisor review - exceeds 12-hour daily limit",
      tags: ["overtime", "policy-violation"],
      category: "compliance",
    },
  ])

  const [newExample, setNewExample] = useState({
    title: "",
    input: "",
    expectedOutput: "",
    tags: "",
    category: "",
  })

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        const newDoc: PolicyDocument = {
          id: `doc-${Date.now()}-${Math.random()}`,
          name: file.name,
          type: file.name.endsWith(".pdf") ? "pdf" : "markdown",
          uploadDate: new Date().toISOString().split("T")[0],
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          status: "processing",
        }
        setPolicyDocuments((prev) => [...prev, newDoc])

        // Simulate processing
        setTimeout(() => {
          setPolicyDocuments((prev) =>
            prev.map((doc) => (doc.id === newDoc.id ? { ...doc, status: "processed" } : doc)),
          )
        }, 3000)
      })
    }
  }

  const addPromptExample = () => {
    if (newExample.title && newExample.input && newExample.expectedOutput) {
      const example: PromptExample = {
        id: `example-${Date.now()}`,
        title: newExample.title,
        input: newExample.input,
        expectedOutput: newExample.expectedOutput,
        tags: newExample.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        category: newExample.category,
      }
      setPromptExamples((prev) => [...prev, example])
      setNewExample({
        title: "",
        input: "",
        expectedOutput: "",
        tags: "",
        category: "",
      })
    }
  }

  const deleteDocument = (id: string) => {
    setPolicyDocuments((prev) => prev.filter((doc) => doc.id !== id))
  }

  const deleteExample = (id: string) => {
    setPromptExamples((prev) => prev.filter((example) => example.id !== id))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Training Console</h2>
        <p className="text-muted-foreground">Manage policy documents and training examples for agents</p>
      </div>

      <Tabs defaultValue="documents" className="space-y-4">
        <TabsList>
          <TabsTrigger value="documents">Policy Documents</TabsTrigger>
          <TabsTrigger value="examples">Prompt Examples</TabsTrigger>
          <TabsTrigger value="categories">Categories & Tags</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Policy Document Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                  <div className="mt-4">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-foreground">Upload policy files</span>
                      <span className="mt-1 block text-sm text-muted-foreground">PDF or Markdown files up to 10MB</span>
                    </label>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      multiple
                      accept=".pdf,.md,.markdown"
                      onChange={handleFileUpload}
                    />
                  </div>
                  <div className="mt-4">
                    <Button asChild>
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <Upload className="mr-2 h-4 w-4" />
                        Choose Files
                      </label>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Uploaded Documents ({policyDocuments.length})</h4>
                {policyDocuments.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{doc.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {doc.size} • Uploaded {new Date(doc.uploadDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={
                          doc.status === "processed"
                            ? "bg-green-500"
                            : doc.status === "processing"
                              ? "bg-blue-500"
                              : "bg-red-500"
                        }
                      >
                        {doc.status}
                      </Badge>
                      <Button size="sm" variant="outline" onClick={() => deleteDocument(doc.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Add New Training Example
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    placeholder="Example title..."
                    value={newExample.title}
                    onChange={(e) => setNewExample((prev) => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <Select
                    value={newExample.category}
                    onValueChange={(value) => setNewExample((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="time-tracking">Time Tracking</SelectItem>
                      <SelectItem value="compliance">Compliance</SelectItem>
                      <SelectItem value="payroll">Payroll</SelectItem>
                      <SelectItem value="employee-engagement">Employee Engagement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Input Scenario</label>
                <Textarea
                  placeholder="Describe the input scenario..."
                  value={newExample.input}
                  onChange={(e) => setNewExample((prev) => ({ ...prev, input: e.target.value }))}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Expected Output</label>
                <Textarea
                  placeholder="Describe the expected agent response..."
                  value={newExample.expectedOutput}
                  onChange={(e) => setNewExample((prev) => ({ ...prev, expectedOutput: e.target.value }))}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Tags (comma-separated)</label>
                <Input
                  placeholder="missing-entry, detection, validation..."
                  value={newExample.tags}
                  onChange={(e) => setNewExample((prev) => ({ ...prev, tags: e.target.value }))}
                />
              </div>

              <Button onClick={addPromptExample}>
                <Plus className="mr-2 h-4 w-4" />
                Add Example
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Training Examples ({promptExamples.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {promptExamples.map((example) => (
                  <div key={example.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{example.title}</h4>
                        <Badge variant="outline" className="mt-1">
                          {example.category}
                        </Badge>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => deleteExample(example.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium text-muted-foreground">Input:</span>
                        <p>{example.input}</p>
                      </div>
                      <div>
                        <span className="font-medium text-muted-foreground">Expected Output:</span>
                        <p>{example.expectedOutput}</p>
                      </div>
                      <div className="flex gap-1 flex-wrap">
                        {example.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Vector Search Categories
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Categories</h4>
                  <div className="space-y-2">
                    {["time-tracking", "compliance", "payroll", "employee-engagement"].map((category) => (
                      <div key={category} className="flex items-center justify-between p-2 border rounded">
                        <span className="capitalize">{category.replace("-", " ")}</span>
                        <Badge variant="outline">
                          {promptExamples.filter((ex) => ex.category === category).length} examples
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Common Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set(promptExamples.flatMap((ex) => ex.tags))).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3">Vector Search Statistics</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {policyDocuments.filter((d) => d.status === "processed").length}
                    </div>
                    <div className="text-sm text-muted-foreground">Documents Indexed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{promptExamples.length}</div>
                    <div className="text-sm text-muted-foreground">Training Examples</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {Array.from(new Set(promptExamples.flatMap((ex) => ex.tags))).length}
                    </div>
                    <div className="text-sm text-muted-foreground">Unique Tags</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
