// src/components/dashboard/skills-analysis.tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Check, X, AlertCircle } from 'lucide-react'

interface SkillsAnalysisProps {
  skillsAnalysis: {
    'Matching Skills': string[]
    'Missing Skills': string[]
    'Additional Skills': string[]
  }
}

export function SkillsAnalysis({ skillsAnalysis }: SkillsAnalysisProps) {
  const skillSections = [
    {
      title: 'Matching Skills',
      skills: skillsAnalysis['Matching Skills'],
      Icon: Check,
      bgColor: 'bg-green-100',
      textColor: 'text-green-700',
      iconColor: 'text-green-600'
    },
    {
      title: 'Missing Skills',
      skills: skillsAnalysis['Missing Skills'],
      Icon: X,
      bgColor: 'bg-red-100',
      textColor: 'text-red-700',
      iconColor: 'text-red-600'
    },
    {
      title: 'Additional Skills',
      skills: skillsAnalysis['Additional Skills'],
      Icon: AlertCircle,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-700',
      iconColor: 'text-blue-600'
    }
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Skills Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {skillSections.map(({ title, skills, Icon, bgColor, textColor, iconColor }) => (
          <div key={title}>
            <div className="flex items-center gap-2 mb-2">
              <div className={`${bgColor} p-1.5 rounded-full`}>
                <Icon className={`h-4 w-4 ${iconColor}`} />
              </div>
              <h3 className="font-semibold">{title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${bgColor} ${textColor}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}