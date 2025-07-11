"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Line,
  LineChart,
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const taskCompletionData = [
  { month: "Jan", completed: 45, created: 52 },
  { month: "Feb", completed: 52, created: 48 },
  { month: "Mar", completed: 48, created: 61 },
  { month: "Apr", completed: 61, created: 55 },
  { month: "May", completed: 55, created: 67 },
  { month: "Jun", completed: 67, created: 59 },
]

const velocityData = [
  { week: "Week 1", velocity: 23 },
  { week: "Week 2", velocity: 31 },
  { week: "Week 3", velocity: 28 },
  { week: "Week 4", velocity: 35 },
  { week: "Week 5", velocity: 29 },
  { week: "Week 6", velocity: 42 },
]

const priorityDistribution = [
  { name: "High", value: 35, color: "#ef4444" },
  { name: "Medium", value: 45, color: "#f59e0b" },
  { name: "Low", value: 20, color: "#10b981" },
]

const burndownData = [
  { day: "Day 1", remaining: 100, ideal: 100 },
  { day: "Day 2", remaining: 95, ideal: 90 },
  { day: "Day 3", remaining: 88, ideal: 80 },
  { day: "Day 4", remaining: 82, ideal: 70 },
  { day: "Day 5", remaining: 75, ideal: 60 },
  { day: "Day 6", remaining: 68, ideal: 50 },
  { day: "Day 7", remaining: 58, ideal: 40 },
  { day: "Day 8", remaining: 45, ideal: 30 },
  { day: "Day 9", remaining: 32, ideal: 20 },
  { day: "Day 10", remaining: 18, ideal: 10 },
]

export function AnalyticsCharts() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Task Completion Trend</CardTitle>
          <CardDescription>Monthly comparison of tasks created vs completed</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={taskCompletionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="created" stackId="1" stroke="#8884d8" fill="#8884d8" name="Created" />
              <Area type="monotone" dataKey="completed" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Completed" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Team Velocity</CardTitle>
          <CardDescription>Story points completed per week</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={velocityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="velocity" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Priority Distribution</CardTitle>
          <CardDescription>Current tasks by priority level</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={priorityDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {priorityDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Sprint Burndown</CardTitle>
          <CardDescription>Current sprint progress vs ideal burndown</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={burndownData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="remaining" stroke="#ef4444" strokeWidth={2} name="Actual" />
              <Line
                type="monotone"
                dataKey="ideal"
                stroke="#10b981"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Ideal"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
