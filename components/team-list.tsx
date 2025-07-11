"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Mail, MessageCircle, UserMinus } from "lucide-react"

const teamMembers = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@taskflow.com",
    role: "Product Manager",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AJ",
    status: "online",
    tasksCompleted: 23,
    tasksInProgress: 5,
    joinDate: "Jan 2023",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@taskflow.com",
    role: "Senior Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "BS",
    status: "online",
    tasksCompleted: 31,
    tasksInProgress: 3,
    joinDate: "Mar 2023",
  },
  {
    id: "3",
    name: "Carol Davis",
    email: "carol@taskflow.com",
    role: "UX Designer",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "CD",
    status: "away",
    tasksCompleted: 18,
    tasksInProgress: 7,
    joinDate: "Feb 2023",
  },
  {
    id: "4",
    name: "David Wilson",
    email: "david@taskflow.com",
    role: "Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "DW",
    status: "offline",
    tasksCompleted: 15,
    tasksInProgress: 2,
    joinDate: "Apr 2023",
  },
  {
    id: "5",
    name: "Emma Brown",
    email: "emma@taskflow.com",
    role: "QA Engineer",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "EB",
    status: "online",
    tasksCompleted: 27,
    tasksInProgress: 4,
    joinDate: "May 2023",
  },
]

export function TeamList() {
  return (
    <div className="space-y-4">
      {teamMembers.map((member) => (
        <Card key={member.id}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback>{member.initials}</AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-background ${
                      member.status === "online"
                        ? "bg-green-500"
                        : member.status === "away"
                          ? "bg-yellow-500"
                          : "bg-gray-400"
                    }`}
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.email}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="secondary">{member.role}</Badge>
                    <span className="text-xs text-muted-foreground">Joined {member.joinDate}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{member.tasksCompleted}</div>
                  <div className="text-xs text-muted-foreground">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{member.tasksInProgress}</div>
                  <div className="text-xs text-muted-foreground">In Progress</div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
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
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
