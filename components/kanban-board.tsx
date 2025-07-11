"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Plus, Clock } from "lucide-react"

const initialColumns = {
  todo: {
    id: "todo",
    title: "To Do",
    tasks: [
      {
        id: "TASK-003",
        title: "Optimize database queries",
        priority: "Low",
        assignee: "Carol Davis",
        dueDate: "2024-01-20",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "CD",
      },
    ],
  },
  inProgress: {
    id: "inProgress",
    title: "In Progress",
    tasks: [
      {
        id: "TASK-001",
        title: "Implement user authentication system",
        priority: "High",
        assignee: "Alice Johnson",
        dueDate: "2024-01-15",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "AJ",
      },
    ],
  },
  review: {
    id: "review",
    title: "Review",
    tasks: [
      {
        id: "TASK-002",
        title: "Design mobile app wireframes",
        priority: "Medium",
        assignee: "Bob Smith",
        dueDate: "2024-01-18",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "BS",
      },
    ],
  },
  done: {
    id: "done",
    title: "Done",
    tasks: [
      {
        id: "TASK-004",
        title: "Update documentation",
        priority: "Medium",
        assignee: "David Wilson",
        dueDate: "2024-01-10",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "DW",
      },
    ],
  },
}

export function KanbanBoard() {
  const [columns, setColumns] = useState(initialColumns)

  return (
    <div className="flex space-x-6 overflow-x-auto pb-4">
      {Object.values(columns).map((column) => (
        <div key={column.id} className="flex-shrink-0 w-80">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">
                  {column.title}
                  <Badge variant="secondary" className="ml-2">
                    {column.tasks.length}
                  </Badge>
                </CardTitle>
                <Button variant="ghost" size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {column.tasks.map((task) => (
                <Card key={task.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium text-sm leading-tight">{task.title}</h4>
                        <Badge
                          variant={
                            task.priority === "High"
                              ? "destructive"
                              : task.priority === "Medium"
                                ? "default"
                                : "secondary"
                          }
                          className="text-xs"
                        >
                          {task.priority}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={task.avatar || "/placeholder.svg"} alt={task.assignee} />
                            <AvatarFallback className="text-xs">{task.initials}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">{task.assignee}</span>
                        </div>

                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{task.dueDate}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  )
}
