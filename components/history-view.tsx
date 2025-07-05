"use client"

import { useState, useEffect } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { API_ENDPOINTS } from "@/lib/api"

interface HistoryEntry {
  _id: string
  data: any
  timestamp: string
  date: string
}

export function HistoryView() {
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [openEntries, setOpenEntries] = useState<Record<string, boolean>>({})

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(API_ENDPOINTS.history, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const result = await response.json()

      if (result.success) {
        setHistory(result.data)
      } else {
        setError("Failed to fetch history")
      }
    } catch (err) {
      setError("Network error")
    } finally {
      setLoading(false)
    }
  }

  const toggleEntry = (entryId: string) => {
    setOpenEntries((prev) => ({
      ...prev,
      [entryId]: !prev[entryId],
    }))
  }

  const formatValue = (value: any) => {
    if (typeof value === "boolean") {
      return value ? "Yes" : "No"
    }
    return value || "Not specified"
  }

  const renderDataEntry = (data: any, path = "") => {
    return Object.entries(data).map(([key, value]) => {
      const currentPath = path ? `${path}.${key}` : key

      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        return (
          <div key={currentPath} className="ml-4 border-l-2 border-gray-200 pl-4 mt-2">
            <h4 className="font-medium text-gray-700 capitalize">{key.replace(/\./g, " → ")}</h4>
            {renderDataEntry(value, currentPath)}
          </div>
        )
      }

      return (
        <div key={currentPath} className="flex justify-between items-center py-1">
          <span className="text-sm text-gray-600 capitalize">{key.replace(/\./g, " → ").replace(/_/g, " ")}:</span>
          <span className="text-sm font-medium">{formatValue(value)}</span>
        </div>
      )
    })
  }

  if (loading) {
    return <div className="text-center py-8">Loading history...</div>
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (history.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No tracking history found. Start by submitting your first entry!
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {history.map((entry) => (
        <div key={entry._id} className="border rounded-lg">
          <Collapsible open={openEntries[entry._id]} onOpenChange={() => toggleEntry(entry._id)}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left hover:bg-gray-50">
              <div>
                <h3 className="font-semibold">{entry.date}</h3>
                <p className="text-sm text-gray-500">{new Date(entry.timestamp).toLocaleTimeString()}</p>
              </div>
              {openEntries[entry._id] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4">
              <div className="space-y-2">
                {Object.keys(entry.data).length > 0 ? (
                  renderDataEntry(entry.data)
                ) : (
                  <p className="text-gray-500 italic">No data recorded for this entry</p>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      ))}
    </div>
  )
}
