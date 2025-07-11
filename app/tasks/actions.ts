"use server"

/**
 * Thin wrapper that duplicates the task-mutation helpers so any legacy
 * imports from `app/tasks/actions` continue to work even after we moved the
 * real logic into `(dashboard)/tasks/actions.ts`.
 */

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function updateTaskStatus(taskId: number, isCompleted: boolean) {
  const supabase = createClient()
  const newStatus = isCompleted ? "done" : "todo"

  const { error } = await supabase.from("tasks").update({ status: newStatus }).eq("id", taskId)

  if (error) {
    console.error("Error updating task status:", error)
    throw new Error("Could not update task status.")
  }

  revalidatePath("/tasks")
  revalidatePath("/")
}

export async function deleteTask(taskId: number) {
  const supabase = createClient()

  const { error } = await supabase.from("tasks").delete().eq("id", taskId)

  if (error) {
    console.error("Error deleting task:", error)
    throw new Error("Could not delete task.")
  }

  revalidatePath("/tasks")
  revalidatePath("/")
}
