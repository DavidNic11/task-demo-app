"use client"

import { useOptimistic, useTransition } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Clock, Edit, Trash2 } from "lucide-react"
import { deleteTask, updateTaskStatus } from "@/app/tasks/actions"
import { format } from "date-fns"

type Task = {
  id: number
  title: string
  description: string | null
  status: "todo" | "in_progress" | "review" | "done"
  priority: "low" | "medium" | "high"
  due_date: string | null
  assignee: string
  avatar: string | null
  initials: string
  completed: boolean
}

export function TaskList({ initialTasks }: { initialTasks: Task[] }) {
  const [optimisticTasks, setOptimisticTasks] = useOptimistic(
    initialTasks,
    (state, { action, task }: { action: "delete" | "toggle"; task: Task | { id: number } }) => {
      if (action === "delete") {
        return state.filter((t) => t.id !== task.id)
      }
      if (action === "toggle") {
        return state.map((t) =>
          t.id === task.id ? { ...t, completed: !t.completed, status: !t.completed ? "done" : "todo" } : t,
        )
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

  const handleToggle = (task: Task) => {
    startTransition(() => {
      setOptimisticTasks({ action: "toggle", task })
      updateTaskStatus(task.id, !task.completed)
    })
  }

  return (
    <div className="space-y-4">
      {optimisticTasks.map((task) => (
        <Card key={task.id} className={task.completed ? "opacity-75" : ""}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => handleToggle(task)}
                  className="mt-1"
                  disabled={isPending}
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className={`font-semibold ${task.completed ? "line-through" : ""}`}>{task.title}</h3>
                    <Badge variant="outline" className="text-xs">
                      TASK-{task.id}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                  <div className="flex items-center space-x-4 text-sm">
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
                    >
                      {task.status}
                    </Badge>
                    <Badge
                      variant={
                        task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"
                      }
                    >
                      {task.priority}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Avatar className="h-5 w-5">
                        <AvatarImage src={task.avatar || "/placeholder.svg"} alt={task.assignee} />
                        <AvatarFallback className="text-xs">{task.initials}</AvatarFallback>
                      </Avatar>
                      <span className="text-muted-foreground">{task.assignee}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{task.due_date ? format(new Date(task.due_date), "MMM dd") : "No due date"}</span>
                    </div>
                  </div>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" disabled={isPending}>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(task.id)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
