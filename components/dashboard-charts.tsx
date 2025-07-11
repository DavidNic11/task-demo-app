"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

const data = [
  { name: "Jan", total: 45, completed: 32 },
  { name: "Feb", total: 52, completed: 41 },
  { name: "Mar", total: 48, completed: 38 },
  { name: "Apr", total: 61, completed: 52 },
  { name: "May", total: 55, completed: 49 },
  { name: "Jun", total: 67, completed: 58 },
]

export function DashboardCharts() {
  return (
    <div className="space-y-4">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#8884d8" name="Total Tasks" />
          <Bar dataKey="completed" fill="#82ca9d" name="Completed" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
