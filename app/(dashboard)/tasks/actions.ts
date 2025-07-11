"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export async function createTask(formData: FormData) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, message: "Authentication required" }
  }

  const taskData = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    priority: formData.get("priority") as "low" | "medium" | "high",
    status: formData.get("status") as "todo" | "in_progress" | "review" | "done",
    due_date: (formData.get("dueDate") as string) || null,
    assignee_id: formData.get("assigneeId") as string,
    user_id: user.id,
  }

  const { error } = await supabase.from("tasks").insert(taskData)

  if (error) {
    console.error("Error creating task:", error)
    return { success: false, message: "Could not create task." }
  }

  revalidatePath("/(dashboard)/tasks", "layout")
  revalidatePath("/(dashboard)/board", "layout")
  revalidatePath("/(dashboard)", "layout")
  redirect("/tasks")
}

export async function updateTask(taskId: number, formData: FormData) {
  const supabase = createClient()

  const taskData = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    priority: formData.get("priority") as "low" | "medium" | "high",
    status: formData.get("status") as "todo" | "in_progress" | "review" | "done",
    due_date: (formData.get("dueDate") as string) || null,
    assignee_id: formData.get("assigneeId") as string,
  }

  const { error } = await supabase.from("tasks").update(taskData).eq("id", taskId)

  if (error) {
    console.error("Error updating task:", error)
    return { success: false, message: "Could not update task." }
  }

  revalidatePath("/(dashboard)/tasks", "layout")
  revalidatePath("/(dashboard)/board", "layout")
  revalidatePath("/(dashboard)", "layout")
  return { success: true, message: "Task updated successfully." }
}

export async function updateTaskStatus(taskId: number, isCompleted: boolean) {
  const supabase = createClient()
  const newStatus = isCompleted ? "done" : "todo"

  const { error } = await supabase.from("tasks").update({ status: newStatus }).eq("id", taskId)

  if (error) {
    console.error("Error updating task status:", error)
    throw new Error("Could not update task status.")
  }

  revalidatePath("/(dashboard)/tasks", "layout")
  revalidatePath("/(dashboard)/board", "layout")
  revalidatePath("/(dashboard)", "layout")
}

export async function deleteTask(taskId: number) {
  const supabase = createClient()

  const { error } = await supabase.from("tasks").delete().eq("id", taskId)

  if (error) {
    console.error("Error deleting task:", error)
    throw new Error("Could not delete task.")
  }

  revalidatePath("/(dashboard)/tasks", "layout")
  revalidatePath("/(dashboard)/board", "layout")
  revalidatePath("/(dashboard)", "layout")
}

export async function updateTaskColumn(taskId: number, newStatus: "todo" | "in_progress" | "review" | "done") {
  const supabase = createClient()
  const { error } = await supabase.from("tasks").update({ status: newStatus }).eq("id", taskId)

  if (error) {
    console.error("Error updating task column:", error)
    return { success: false, message: "Could not update task status." }
  }

  revalidatePath("/(dashboard)/board")
  revalidatePath("/(dashboard)/tasks")
  revalidatePath("/(dashboard)")
  return { success: true }
}
