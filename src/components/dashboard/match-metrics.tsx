// src/components/dashboard/match-metrics.tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface MatchMetricsProps {
  metrics: {
    'Overall Match': string
    'Skills Match': string
  }
}

export function MatchMetrics({ metrics }: MatchMetricsProps) {
  const chartData = [
    {
      name: 'Overall Match',
      value: parseInt(metrics['Overall Match'])
    },
    {
      name: 'Skills Match',
      value: parseInt(metrics['Skills Match'])
    }
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Match Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip formatter={(value) => `${value}%`} />
              <Bar dataKey="value" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 space-y-4">
          {Object.entries(metrics).map(([key, value]) => (
            <div key={key}>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">{key}</span>
                <span className="text-sm font-medium">{value}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}