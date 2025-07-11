import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, Clock, Award } from "lucide-react"

export function TeamStats() {
  const stats = [
    {
      title: "Total Members",
      value: "12",
      description: "+2 this month",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Active Today",
      value: "8",
      description: "67% of team",
      icon: UserCheck,
      color: "text-green-600",
    },
    {
      title: "Avg. Response Time",
      value: "2.4h",
      description: "-0.3h from last week",
      icon: Clock,
      color: "text-yellow-600",
    },
    {
      title: "Top Performer",
      value: "Bob S.",
      description: "31 tasks completed",
      icon: Award,
      color: "text-purple-600",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
