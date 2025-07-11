import { TaskForm } from "@/components/task-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"

export default async function NewTaskPage() {
  const supabase = createClient()
  const { data: profiles } = await supabase.from("profiles").select("id, full_name")

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Create New Task</h2>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Task Details</CardTitle>
          <CardDescription>Fill in the information below to create a new task</CardDescription>
        </CardHeader>
        <CardContent>
          <TaskForm profiles={profiles || []} />
        </CardContent>
      </Card>
    </div>
  )
}
