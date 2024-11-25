// src/components/dashboard/improvement-suggestions.tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

interface ImprovementSuggestionsProps {
  skills: {
    'Matching Skills': string[]
    'Missing Skills': string[]
  }
}

export function ImprovementSuggestions({ skills }: ImprovementSuggestionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Improvement Suggestions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <ul className="list-disc pl-5 space-y-2">
            {skills['Missing Skills'].map((skill) => (
              <li key={skill} className="text-gray-700">
                Consider adding <span className="font-medium">{skill}</span> skills to better match the job requirements
              </li>
            ))}
            {skills['Matching Skills'].length > 0 && (
              <li className="text-gray-700">
                Highlight your expertise in:{' '}
                <span className="font-medium">
                  {skills['Matching Skills'].join(', ')}
                </span>
              </li>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}