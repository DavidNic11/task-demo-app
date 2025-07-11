"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const teamPerformanceData = [
  { name: "Alice", completed: 23, inProgress: 5, efficiency: 92 },
  { name: "Bob", completed: 31, inProgress: 3, efficiency: 95 },
  { name: "Carol", completed: 18, inProgress: 7, efficiency: 78 },
  { name: "David", completed: 15, inProgress: 2, efficiency: 88 },
  { name: "Emma", completed: 27, inProgress: 4, efficiency: 91 },
]

const individualMetrics = [
  {
    name: "Alice Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AJ",
    role: "Product Manager",
    tasksCompleted: 23,
    efficiency: 92,
    avgCycleTime: "2.8 days",
    streak: 12,
  },
  {
    name: "Bob Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "BS",
    role: "Senior Developer",
    tasksCompleted: 31,
    efficiency: 95,
    avgCycleTime: "3.1 days",
    streak: 18,
  },
  {
    name: "Carol Davis",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "CD",
    role: "UX Designer",
    tasksCompleted: 18,
    efficiency: 78,
    avgCycleTime: "4.2 days",
    streak: 5,
  },
  {
    name: "David Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "DW",
    role: "Developer",
    tasksCompleted: 15,
    efficiency: 88,
    avgCycleTime: "3.5 days",
    streak: 8,
  },
  {
    name: "Emma Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "EB",
    role: "QA Engineer",
    tasksCompleted: 27,
    efficiency: 91,
    avgCycleTime: "2.9 days",
    streak: 15,
  },
]

export function TeamPerformance() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Team Productivity Overview</CardTitle>
          <CardDescription>Tasks completed by team member this month</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={teamPerformanceData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="completed" fill="#8884d8" name="Completed Tasks" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Individual Performance</CardTitle>
            <CardDescription>Detailed metrics for each team member</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {individualMetrics.map((member) => (
                <div key={member.name} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback>{member.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{member.name}</h4>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-8">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{member.tasksCompleted}</div>
                      <div className="text-xs text-muted-foreground">Tasks</div>
                    </div>

                    <div className="text-center min-w-[100px]">
                      <div className="text-sm font-medium mb-1">Efficiency</div>
                      <Progress value={member.efficiency} className="w-20" />
                      <div className="text-xs text-muted-foreground mt-1">{member.efficiency}%</div>
                    </div>

                    <div className="text-center">
                      <div className="text-sm font-medium">{member.avgCycleTime}</div>
                      <div className="text-xs text-muted-foreground">Avg Cycle Time</div>
                    </div>

                    <div className="text-center">
                      <Badge variant={member.streak > 10 ? "default" : "secondary"}>{member.streak} day streak</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
