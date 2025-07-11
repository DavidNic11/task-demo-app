import { Suspense } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { TeamList } from "@/components/team-list"
import { TeamStats } from "@/components/team-stats"
import { InviteTeamMember } from "@/components/invite-team-member"
import { createClient } from "@/lib/supabase/server"
import type { Database } from "@/lib/database.types"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]

async function TeamData() {
  const supabase = createClient()
  const { data: profiles, error } = await supabase.from("profiles").select("*")

  if (error) {
    return <p className="text-destructive">Could not load team members.</p>
  }

  return <TeamList profiles={profiles || []} />
}

export default function TeamPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Team</h2>
        <InviteTeamMember />
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search team members..." className="pl-8" />
        </div>
      </div>

      <TeamStats />

      <Suspense fallback={<div className="text-center p-8">Loading team...</div>}>
        <TeamData />
      </Suspense>
    </div>
  )
}
