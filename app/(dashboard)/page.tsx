import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardCharts } from "@/components/dashboard-charts"
import { RecentActivity } from "@/components/recent-activity"
import { TaskOverview } from "@/components/task-overview"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, CheckCircle, List, Clock } from "lucide-react"

export default async function DashboardPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Fetch all data in parallel
  const [
    { count: totalTasks },
    { count: completedTasks },
    { count: totalUsers },
    { data: recentTasks },
    { data: activityLog },
    { data: taskStats },
  ] = await Promise.all([
    supabase.from("tasks").select("*", { count: "exact", head: true }),
    supabase.from("tasks").select("*", { count: "exact", head: true }).eq("status", "Done"),
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase
      .from("tasks")
      .select("*, profiles (full_name, avatar_url)")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("activity")
      .select("*, profiles (full_name, avatar_url)")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase.rpc("get_task_stats_by_month"),
  ])

  const openTasks = (totalTasks ?? 0) - (completedTasks ?? 0)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <List className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTasks ?? 0}</div>
            <p className="text-xs text-muted-foreground">All tasks in the system</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTasks ?? 0}</div>
            <p className="text-xs text-muted-foreground">
              {totalTasks ? `${Math.round((completedTasks! / totalTasks!) * 100)}% completed` : "0% completed"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tasks</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openTasks}</div>
            <p className="text-xs text-muted-foreground">Tasks currently in progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers ?? 0}</div>
            <p className="text-xs text-muted-foreground">Active users on the platform</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <DashboardCharts data={taskStats?.data || []} />
        </div>
        <div className="col-span-4 lg:col-span-3">
          <RecentActivity activities={activityLog} />
        </div>
      </div>
      <TaskOverview tasks={recentTasks} />
    </div>
  )
}
