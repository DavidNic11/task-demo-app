import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const activities = [
  {
    user: "Alice Johnson",
    action: "completed task",
    task: "Update user authentication",
    time: "2 minutes ago",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "AJ",
  },
  {
    user: "Bob Smith",
    action: "created task",
    task: "Design new landing page",
    time: "1 hour ago",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "BS",
  },
  {
    user: "Carol Davis",
    action: "commented on",
    task: "Fix mobile responsiveness",
    time: "3 hours ago",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "CD",
  },
  {
    user: "David Wilson",
    action: "assigned task",
    task: "Database optimization",
    time: "5 hours ago",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "DW",
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-center space-x-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={activity.avatar || "/placeholder.svg"} alt={activity.user} />
            <AvatarFallback>{activity.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm">
              <span className="font-medium">{activity.user}</span> {activity.action}{" "}
              <span className="font-medium">{activity.task}</span>
            </p>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
