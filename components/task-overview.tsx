import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Database } from "@/lib/database.types"

type Task = Database["public"]["Tables"]["tasks"]["Row"] & {
  profiles: Pick<Database["public"]["Tables"]["profiles"]["Row"], "full_name" | "avatar_url"> | null
}

const priorityVariant: Record<string, "default" | "secondary" | "destructive"> = {
  Low: "secondary",
  Medium: "default",
  High: "destructive",
}

export function TaskOverview({ tasks }: { tasks: Task[] | null }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Tasks</CardTitle>
        <CardDescription>An overview of the most recently created tasks.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks && tasks.length > 0 ? (
            tasks.map((task) => (
              <div key={task.id} className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={task.profiles?.avatar_url || "/placeholder-user.jpg"} alt="Avatar" />
                  <AvatarFallback>{task.profiles?.full_name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">{task.title}</p>
                  <p className="text-sm text-muted-foreground">
                    Assigned to {task.profiles?.full_name || "Unassigned"}
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  <Badge variant={priorityVariant[task.priority || "Medium"]}>{task.priority}</Badge>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No recent tasks.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
