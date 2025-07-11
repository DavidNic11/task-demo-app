"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

/**
 * Update a task’s status (e.g. todo → done)                           */
export async function updateTaskStatus(taskId: string, newStatus: string) {
  const supabase = createClient()

  const { error } = await supabase.from("tasks").update({ status: newStatus }).eq("id", taskId)

  if (error) {
    throw new Error(error.message)
  }

  /* Ensure any pages that list tasks pick up the change */
  revalidatePath("/(dashboard)/tasks")
  revalidatePath("/(dashboard)/board")
}

/**
 * Delete a task                                                       */
export async function deleteTask(taskId: string) {
  const supabase = createClient()

  const { error } = await supabase.from("tasks").delete().eq("id", taskId)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/(dashboard)/tasks")
  revalidatePath("/(dashboard)/board")
}
