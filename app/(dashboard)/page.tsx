import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus, Users, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"
import { DashboardCharts } from "@/components/dashboard-charts"
import { RecentActivity } from "@/components/recent-activity"
import { TaskOverview } from "@/components/task-overview"
import { createClient } from "@/lib/supabase/server"

export default async function Dashboard() {
  const supabase = createClient()

  const { count: totalTasks } = await supabase.from("tasks").select("*", { count: "exact", head: true })
  const { count: inProgressTasks } = await supabase
    .from("tasks")
    .select("*", { count: "exact", head: true })
    .eq("status", "in_progress")
  const { count: completedTasks } = await supabase
    .from("tasks")
    .select("*", { count: "exact", head: true })
    .eq("status", "done")
  const { count: teamMembers } = await supabase.from("profiles").select("*", { count: "exact", head: true })

  const stats = [
    {
      title: "Total Tasks",
      value: totalTasks ?? 0,
      description: "+12 from last month",
      icon: CheckCircle,
      color: "text-blue-600",
    },
    {
      title: "In Progress",
      value: inProgressTasks ?? 0,
      description: "Active tasks",
      icon: Clock,
      color: "text-yellow-600",
    },
    {
      title: "Completed",
      value: completedTasks ?? 0,
      description: "+8 this week",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Team Members",
      value: teamMembers ?? 0,
      description: "Active contributors",
      icon: Users,
      color: "text-purple-600",
    },
  ]

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Link href="/tasks/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
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

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Task Progress</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Suspense fallback={<div>Loading charts...</div>}>
                  <DashboardCharts />
                </Suspense>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates from your team</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div>Loading activity...</div>}>
                  <RecentActivity />
                </Suspense>
              </CardContent>
            </Card>
          </div>
          <Suspense fallback={<div>Loading tasks...</div>}>
            <TaskOverview />
          </Suspense>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Dashboard</CardTitle>
              <CardDescription>Detailed insights into team productivity and task completion rates</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading analytics...</div>}>
                <DashboardCharts />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
