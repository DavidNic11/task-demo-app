import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock } from "lucide-react"

const recentTasks = [
  {
    id: "TASK-001",
    title: "Implement user authentication system",
    status: "In Progress",
    priority: "High",
    assignee: "Alice Johnson",
    dueDate: "2024-01-15",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "AJ",
  },
  {
    id: "TASK-002",
    title: "Design mobile app wireframes",
    status: "Review",
    priority: "Medium",
    assignee: "Bob Smith",
    dueDate: "2024-01-18",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "BS",
  },
  {
    id: "TASK-003",
    title: "Optimize database queries",
    status: "Todo",
    priority: "Low",
    assignee: "Carol Davis",
    dueDate: "2024-01-20",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "CD",
  },
]

export function TaskOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Tasks</CardTitle>
        <CardDescription>Your most recent tasks and their current status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div>
                  <p className="font-medium">{task.title}</p>
                  <p className="text-sm text-muted-foreground">{task.id}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge
                  variant={
                    task.status === "In Progress" ? "default" : task.status === "Review" ? "secondary" : "outline"
                  }
                >
                  {task.status}
                </Badge>
                <Badge
                  variant={
                    task.priority === "High" ? "destructive" : task.priority === "Medium" ? "default" : "secondary"
                  }
                >
                  {task.priority}
                </Badge>
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={task.avatar || "/placeholder.svg"} alt={task.assignee} />
                    <AvatarFallback className="text-xs">{task.initials}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">{task.assignee}</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{task.dueDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
