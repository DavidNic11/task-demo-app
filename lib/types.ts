export type Profile = {
  id: string
  full_name: string | null
  avatar_url: string | null
}

export type Task = {
  id: number
  created_at: string
  title: string
  description: string | null
  due_date: string | null
  priority: "low" | "medium" | "high"
  status: "todo" | "in_progress" | "review" | "done"
  user_id: string
  assignee_id: string
}

export type TaskWithProfile = Task & {
  assignee: Profile | null
}

export type KanbanColumn = {
  id: "todo" | "in_progress" | "review" | "done"
  title: string
  tasks: TaskWithProfile[]
}

export type KanbanData = {
  [key in "todo" | "in_progress" | "review" | "done"]: KanbanColumn
}
