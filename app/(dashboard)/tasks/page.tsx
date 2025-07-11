import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import Link from "next/link"
import { TaskList } from "@/components/task-list"
import { TaskFilters } from "@/components/task-filters"
import { createClient } from "@/lib/supabase/server"

export const revalidate = 0

export default async function TasksPage() {
  const supabase = createClient()

  const tasksPromise = supabase
    .from("tasks")
    .select(
      `
      *,
      profiles (
        full_name,
        avatar_url
      )
    `,
    )
    .order("created_at", { ascending: false })

  const profilesPromise = supabase.from("profiles").select("*")

  const [{ data: tasks, error: tasksError }, { data: profiles, error: profilesError }] = await Promise.all([
    tasksPromise,
    profilesPromise,
  ])

  if (tasksError || profilesError) {
    console.error("Error fetching data:", tasksError || profilesError)
    return <p className="p-8">Could not load data. Please try again later.</p>
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Tasks</h2>
        <Link href="/tasks/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </Link>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search tasks..." className="pl-8" />
        </div>
        <TaskFilters />
      </div>

      <Suspense fallback={<div>Loading tasks...</div>}>
        <TaskList initialTasks={tasks || []} profiles={profiles || []} />
      </Suspense>
    </div>
  )
}
