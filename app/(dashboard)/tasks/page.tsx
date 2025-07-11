import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import Link from "next/link"
import { TaskList } from "@/components/task-list"
import { TaskFilters } from "@/components/task-filters"
import { createClient } from "@/lib/supabase/server"

export default async function TasksPage() {
  const supabase = createClient()
  const { data: tasks, error } = await supabase
    .from("tasks")
    .select(
      `
      id,
      title,
      description,
      status,
      priority,
      due_date,
      profiles (
        id,
        full_name,
        avatar_url
      )
    `,
    )
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching tasks:", error)
    return <p className="p-8">Could not load tasks.</p>
  }

  // Map data to match component expectation
  const formattedTasks = tasks.map((task) => ({
    ...task,
    assignee: task.profiles?.full_name || "Unassigned",
    avatar: task.profiles?.avatar_url,
    initials:
      task.profiles?.full_name
        ?.split(" ")
        .map((n) => n[0])
        .join("") || "U",
    completed: task.status === "done",
  }))

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
        <TaskList initialTasks={formattedTasks} />
      </Suspense>
    </div>
  )
}
