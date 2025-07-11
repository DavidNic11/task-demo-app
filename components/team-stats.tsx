import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, CheckCircle, ListTodo, Award } from "lucide-react"
import { createClient } from "@/lib/supabase/server"

export async function TeamStats() {
  const supabase = createClient()

  const { count: totalMembers } = await supabase.from("profiles").select("*", { count: "exact", head: true })

  const { count: openTasks } = await supabase
    .from("tasks")
    .select("*", { count: "exact", head: true })
    .in("status", ["todo", "in_progress", "review"])

  const { count: tasksCompleted } = await supabase
    .from("tasks")
    .select("*", { count: "exact", head: true })
    .eq("status", "done")

  const { data: topPerformerData } = await supabase.rpc("get_top_performer").single()

  const stats = [
    {
      title: "Total Members",
      value: totalMembers || 0,
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Open Tasks",
      value: openTasks || 0,
      icon: ListTodo,
      color: "text-yellow-600",
    },
    {
      title: "Tasks Completed",
      value: tasksCompleted || 0,
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Top Performer",
      value: topPerformerData?.full_name || "N/A",
      description: `${topPerformerData?.completed_count || 0} tasks completed`,
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
              {stat.description && <p className="text-xs text-muted-foreground">{stat.description}</p>}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
