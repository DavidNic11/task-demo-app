"use client"

import { useOptimistic, useTransition } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MoreHorizontal, Clock, Edit, Trash2 } from "lucide-react"
import { deleteTask, updateTaskStatus } from "@/app/(dashboard)/tasks/actions"
import { format } from "date-fns"
import { EditTaskForm } from "./edit-task-form"
import type { Database } from "@/lib/database.types"

type TaskWithProfile = Database["public"]["Tables"]["tasks"]["Row"] & {
  profiles: Pick<Database["public"]["Tables"]["profiles"]["Row"], "full_name" | "avatar_url"> | null
}
type Profile = Database["public"]["Tables"]["profiles"]["Row"]

export function TaskList({ initialTasks, profiles }: { initialTasks: TaskWithProfile[]; profiles: Profile[] }) {
  const [optimisticTasks, setOptimisticTasks] = useOptimistic(
    initialTasks,
    (state, { action, task }: { action: "delete" | "toggle"; task: TaskWithProfile | { id: number } }) => {
      if (action === "delete") {
        return state.filter((t) => t.id !== task.id)
      }
      if (action === "toggle") {
        return state.map((t) => (t.id === task.id ? { ...t, status: t.status === "done" ? "todo" : "done" } : t))
      }
      return state
    },
  )
  const [isPending, startTransition] = useTransition()

  const handleDelete = (taskId: number) => {
    startTransition(() => {
      setOptimisticTasks({ action: "delete", task: { id: taskId } })
      deleteTask(taskId)
    })
  }

  const handleToggle = (task: TaskWithProfile) => {
    startTransition(() => {
      setOptimisticTasks({ action: "toggle", task })
      updateTaskStatus(task.id, task.status !== "done")
    })
  }

  const getInitials = (name: string | null) => {
    if (!name) return "??"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="space-y-4">
      {optimisticTasks.map((task) => (
        <Dialog key={task.id}>
          <Card className={task.status === "done" ? "bg-muted/50" : ""}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <Checkbox
                    checked={task.status === "done"}
                    onCheckedChange={() => handleToggle(task)}
                    className="mt-1"
                    disabled={isPending}
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3
                        className={`font-semibold ${task.status === "done" ? "line-through text-muted-foreground" : ""}`}
                      >
                        {task.title}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        TASK-{task.id}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                    <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-sm">
                      <Badge
                        variant={
                          task.status === "in_progress"
                            ? "default"
                            : task.status === "review"
                              ? "secondary"
                              : task.status === "done"
                                ? "outline"
                                : "outline"
                        }
                        className="capitalize"
                      >
                        {task.status.replace("_", " ")}
                      </Badge>
                      <Badge
                        variant={
                          task.priority === "high"
                            ? "destructive"
                            : task.priority === "medium"
                              ? "secondary"
                              : "outline"
                        }
                        className="capitalize"
                      >
                        {task.priority}
                      </Badge>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={task.profiles?.avatar_url || undefined}
                            alt={task.profiles?.full_name || ""}
                          />
                          <AvatarFallback className="text-xs">{getInitials(task.profiles?.full_name)}</AvatarFallback>
                        </Avatar>
                        <span className="text-muted-foreground">{task.profiles?.full_name || "Unassigned"}</span>
                      </div>
                      {task.due_date && (
                        <div className="flex items-center space-x-1 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{format(new Date(task.due_date), "MMM dd")}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8" disabled={isPending}>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DialogTrigger asChild>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                    </DialogTrigger>
                    <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(task.id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>
            <EditTaskForm task={task} profiles={profiles} />
          </DialogContent>
        </Dialog>
      ))}
    </div>
  )
}
