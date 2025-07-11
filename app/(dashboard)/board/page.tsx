import { KanbanBoard } from "@/components/kanban-board"
import { createClient } from "@/lib/supabase/server"
import type { KanbanData, TaskWithProfile } from "@/lib/types"

export default async function BoardPage() {
  const supabase = createClient()

  const { data: tasks, error } = await supabase
    .from("tasks")
    .select(
      `
      *,
      assignee:profiles (
        id,
        full_name,
        avatar_url
      )
    `,
    )
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching tasks:", error)
    // In a real app, you'd want to show a user-friendly error message here
  }

  const initialColumns: KanbanData = {
    todo: { id: "todo", title: "To Do", tasks: [] },
    in_progress: { id: "in_progress", title: "In Progress", tasks: [] },
    review: { id: "review", title: "Review", tasks: [] },
    done: { id: "done", title: "Done", tasks: [] },
  }

  tasks?.forEach((task) => {
    // Ensure task status is a valid key for initialColumns
    if (task.status && task.status in initialColumns) {
      initialColumns[task.status].tasks.push(task as unknown as TaskWithProfile)
    }
  })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Board</h2>
      </div>
      <KanbanBoard initialData={initialColumns} />
    </div>
  )
}
