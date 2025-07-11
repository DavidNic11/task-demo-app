import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ProfileSettings } from "@/components/profile-settings"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NotificationSettings } from "@/components/notification-settings"
import { TeamSettings } from "@/components/team-settings"
import { AppearanceSettings } from "@/components/appearance-settings"

export default async function SettingsPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="space-y-4">
          <ProfileSettings profile={profile} />
        </TabsContent>
        <TabsContent value="appearance" className="space-y-4">
          <AppearanceSettings />
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <NotificationSettings />
        </TabsContent>
        <TabsContent value="team" className="space-y-4">
          <TeamSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
