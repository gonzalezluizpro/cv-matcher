'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Check, X, AlertCircle, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

interface SkillsAnalysis {
  'Matching Skills': string[]
  'Missing Skills': string[]
  'Additional Skills': string[]
}

interface Results {
  metrics: {
    'Overall Match': string
    'Skills Match': string
  }
  skills_analysis: SkillsAnalysis
}

export default function CVMatcher() {
  const [cvText, setCvText] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [results, setResults] = useState<Results | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const analyzeMatch = async () => {
    try {
      setIsLoading(true)
      
      const response = await fetch(`${API_URL}/api/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          cv_text: cvText,
          job_description: jobDescription,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Failed to analyze CV');
      }

      const data = await response.json()
      setResults(data)
      toast.success('Analysis completed successfully!')
    } catch (error) {
      console.error('Analysis error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to analyze CV. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">CV-Job Description Matcher</h1>
        <p className="text-gray-500">Analyze how well your CV matches the job requirements</p>
      </div>

      {/* Input Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>CV Content</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              className="min-h-[200px] resize-none"
              placeholder="Paste your CV text here..."
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
              disabled={isLoading}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Job Description</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              className="min-h-[200px] resize-none"
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              disabled={isLoading}
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button
          className="w-48"
          onClick={analyzeMatch}
          disabled={!cvText.trim() || !jobDescription.trim() || isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            'Analyze Match'
          )}
        </Button>
      </div>

      {results && (
        <div className="space-y-6">
          {/* Match Metrics Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Match Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { name: 'Overall Match', value: parseInt(results.metrics['Overall Match']) },
                      { name: 'Skills Match', value: parseInt(results.metrics['Skills Match']) }
                    ]}>
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Bar dataKey="value" fill="#2563eb" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Skills Summary Card */}
            <Card>
              <CardHeader>
                <CardTitle>Skills Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {/* Matching Skills */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-green-100 p-1.5 rounded-full">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <h3 className="font-semibold">Matching Skills</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {results.skills_analysis['Matching Skills'].map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Missing Skills */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-red-100 p-1.5 rounded-full">
                        <X className="h-4 w-4 text-red-600" />
                      </div>
                      <h3 className="font-semibold">Missing Skills</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {results.skills_analysis['Missing Skills'].map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Additional Skills */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-blue-100 p-1.5 rounded-full">
                        <AlertCircle className="h-4 w-4 text-blue-600" />
                      </div>
                      <h3 className="font-semibold">Additional Skills</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {results.skills_analysis['Additional Skills'].map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Improvement Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle>Improvement Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ul className="list-disc pl-5 space-y-2">
                  {results.skills_analysis['Missing Skills'].map((skill) => (
                    <li key={skill} className="text-gray-700">
                      Consider adding <span className="font-medium">{skill}</span> skills to better match the job requirements
                    </li>
                  ))}
                  {results.skills_analysis['Matching Skills'].length > 0 && (
                    <li className="text-gray-700">
                      Highlight your expertise in: {' '}
                      <span className="font-medium">
                        {results.skills_analysis['Matching Skills'].join(', ')}
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}