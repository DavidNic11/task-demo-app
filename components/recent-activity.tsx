import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Database } from "@/lib/database.types"

type Activity = Database["public"]["Tables"]["activity"]["Row"] & {
  profiles: Pick<Database["public"]["Tables"]["profiles"]["Row"], "full_name" | "avatar_url"> | null
}

export function RecentActivity({ activities }: { activities: Activity[] | null }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities && activities.length > 0 ? (
          activities.map((activity) => (
            <div key={activity.id} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src={activity.profiles?.avatar_url || "/placeholder-user.jpg"} alt="Avatar" />
                <AvatarFallback>{activity.profiles?.full_name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{activity.profiles?.full_name || "A user"}</p>
                <p className="text-sm text-muted-foreground">{activity.details}</p>
              </div>
              <div className="ml-auto text-sm text-muted-foreground">
                {new Date(activity.created_at).toLocaleTimeString()}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No recent activity.</p>
        )}
      </CardContent>
    </Card>
  )
}
