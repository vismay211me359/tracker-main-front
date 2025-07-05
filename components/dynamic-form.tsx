"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { data } from "@/lib/data"
import { API_ENDPOINTS } from "@/lib/api"

export function DynamicForm() {
  const [formData, setFormData] = useState<any>({})
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  const toggleSection = (sectionKey: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }))
  }

  const updateFormData = (path: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [path]: value,
    }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    setMessage("")

    try {
      const submissionData = {
        data: formData,
        timestamp: new Date().toISOString(),
        date: new Date().toDateString(),
      }

      const token = localStorage.getItem("token")
      const response = await fetch(API_ENDPOINTS.submit, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(submissionData),
      })

      const result = await response.json()

      if (result.success) {
        setMessage("Data submitted successfully!")
        setFormData({})
      } else {
        setMessage("Failed to submit data. Please try again.")
      }
    } catch (error) {
      setMessage("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const renderInput = (item: any, categoryName: string, sectionName: string, itemName?: string) => {
    const inputKey = itemName ? `${categoryName}.${sectionName}.${itemName}` : `${categoryName}.${sectionName}`

    return (
      <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
        {item.yes_or_no_input && (
          <div className="flex items-center space-x-2">
            <Switch
              id={`${inputKey}.yes_or_no`}
              checked={formData[`${inputKey}.yes_or_no`] || false}
              onCheckedChange={(checked) => updateFormData(`${inputKey}.yes_or_no`, checked)}
            />
            <Label htmlFor={`${inputKey}.yes_or_no`}>Completed</Label>
          </div>
        )}

        {item.radioinput && (
          <div className="space-y-2">
            <Label>Intensity Level</Label>
            <RadioGroup
              value={formData[`${inputKey}.radio`] || ""}
              onValueChange={(value) => updateFormData(`${inputKey}.radio`, value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id={`${inputKey}.low`} />
                <Label htmlFor={`${inputKey}.low`}>Low</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id={`${inputKey}.medium`} />
                <Label htmlFor={`${inputKey}.medium`}>Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id={`${inputKey}.high`} />
                <Label htmlFor={`${inputKey}.high`}>High</Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {item.numberinput && (
          <div className="space-y-2">
            <Label htmlFor={`${inputKey}.number`}>{categoryName === "gym" ? "Sets/Reps" : "Quantity"}</Label>
            <Input
              id={`${inputKey}.number`}
              type="number"
              value={formData[`${inputKey}.number`] || ""}
              onChange={(e) => updateFormData(`${inputKey}.number`, e.target.value)}
              placeholder="Enter number"
            />
          </div>
        )}

        {item.textinput && (
          <div className="space-y-2">
            <Label htmlFor={`${inputKey}.text`}>Notes</Label>
            <Input
              id={`${inputKey}.text`}
              type="text"
              value={formData[`${inputKey}.text`] || ""}
              onChange={(e) => updateFormData(`${inputKey}.text`, e.target.value)}
              placeholder="Enter notes"
            />
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {data.map((category) => (
        <div key={category.category} className="border rounded-lg">
          <Collapsible open={openCategories[category.category]} onOpenChange={() => toggleCategory(category.category)}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left hover:bg-gray-50">
              <h2 className="text-xl font-semibold capitalize">{category.category}</h2>
              {openCategories[category.category] ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4">
              <div className="space-y-4">
                {category.sections.map((section) => {
                  const sectionKey = `${category.category}.${section.name}`

                  if (section.items) {
                    // Section with items
                    return (
                      <div key={section.name} className="border rounded-lg">
                        <Collapsible open={openSections[sectionKey]} onOpenChange={() => toggleSection(sectionKey)}>
                          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-left hover:bg-gray-50">
                            <h3 className="font-medium capitalize">{section.name}</h3>
                            {openSections[sectionKey] ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </CollapsibleTrigger>
                          <CollapsibleContent className="px-3 pb-3">
                            <div className="space-y-3">
                              {section.items.map((item) => (
                                <div key={item.name}>
                                  <h4 className="font-medium capitalize mb-2">{item.name}</h4>
                                  {item.endpoint && renderInput(item, category.category, section.name, item.name)}
                                </div>
                              ))}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </div>
                    )
                  } else {
                    // Direct section
                    return (
                      <div key={section.name}>
                        <h3 className="font-medium capitalize mb-2">{section.name}</h3>
                        {section.endpoint && renderInput(section, category.category, section.name)}
                      </div>
                    )
                  }
                })}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      ))}

      {message && (
        <Alert>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      <Button onClick={handleSubmit} disabled={loading} className="w-full" size="lg">
        {loading ? "Submitting..." : "Submit Today's Data"}
      </Button>
    </div>
  )
}
