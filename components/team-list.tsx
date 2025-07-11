"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Mail, UserMinus } from "lucide-react"
import type { Database } from "@/lib/database.types"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]

export function TeamList({ profiles }: { profiles: Profile[] }) {
  if (!profiles.length) {
    return (
      <div className="text-center text-muted-foreground p-8">No team members found. Invite someone to get started!</div>
    )
  }

  return (
    <div className="space-y-4">
      {profiles.map((member) => (
        <Card key={member.id}>
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={member.avatar_url || undefined} alt={member.full_name || "User"} />
                <AvatarFallback>{member.full_name ? member.full_name.charAt(0).toUpperCase() : "U"}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{member.full_name || "No Name"}</h3>
                <p className="text-sm text-muted-foreground">{member.email}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="secondary">{member.role || "Member"}</Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" asChild>
                <a href={`mailto:${member.email}`}>
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </a>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                  <DropdownMenuItem>Assign Tasks</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <UserMinus className="mr-2 h-4 w-4" />
                    Remove from Team
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
