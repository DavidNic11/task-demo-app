import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

const metrics = [
  {
    title: "Average Cycle Time",
    value: "3.2 days",
    change: -0.5,
    trend: "down",
    description: "Time from start to completion",
    progress: 75,
  },
  {
    title: "Lead Time",
    value: "5.8 days",
    change: -1.2,
    trend: "down",
    description: "Time from creation to completion",
    progress: 68,
  },
  {
    title: "Throughput",
    value: "12 tasks/week",
    change: 2,
    trend: "up",
    description: "Tasks completed per week",
    progress: 85,
  },
  {
    title: "Work in Progress",
    value: "23 tasks",
    change: 0,
    trend: "stable",
    description: "Currently active tasks",
    progress: 60,
  },
  {
    title: "Defect Rate",
    value: "2.1%",
    change: -0.3,
    trend: "down",
    description: "Tasks requiring rework",
    progress: 92,
  },
  {
    title: "Team Utilization",
    value: "87%",
    change: 5,
    trend: "up",
    description: "Active time vs capacity",
    progress: 87,
  },
]

export function ProductivityMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {metrics.map((metric) => {
        const TrendIcon = metric.trend === "up" ? TrendingUp : metric.trend === "down" ? TrendingDown : Minus
        const trendColor =
          metric.trend === "up" ? "text-green-600" : metric.trend === "down" ? "text-red-600" : "text-gray-600"

        return (
          <Card key={metric.title}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <div className="flex items-center space-x-1">
                  <TrendIcon className={`h-4 w-4 ${trendColor}`} />
                  <span className={`text-sm ${trendColor}`}>
                    {metric.change > 0 ? "+" : ""}
                    {metric.change}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">{metric.value}</div>
              <Progress value={metric.progress} className="mb-2" />
              <p className="text-xs text-muted-foreground">{metric.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
