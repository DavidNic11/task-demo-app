"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { updateProfile } from "@/app/(dashboard)/settings/actions"
import { createClient } from "@/lib/supabase/client"
import type { Database } from "@/lib/database.types"
import { useToast } from "@/components/ui/use-toast"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]

function SubmitButton() {
  // Using a separate hook for form status is not needed with useFormState
  // The pending state is part of the return value of useFormState
  return null
}

function AvatarUpload({
  uid,
  url,
  onUpload,
}: {
  uid: string | null
  url: string | null
  onUpload: (url: string) => void
}) {
  const supabase = createClient()
  const [uploading, setUploading] = useState(false)

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.")
      }
      if (!uid) {
        throw new Error("You must be logged in to upload an avatar.")
      }

      const file = event.target.files[0]
      const fileExt = file.name.split(".").pop()
      const filePath = `${uid}-${Math.random()}.${fileExt}`

      const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(filePath)

      onUpload(publicUrl)
    } catch (error) {
      alert("Error uploading avatar!")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex items-center space-x-4">
      <Avatar className="h-20 w-20">
        <AvatarImage src={url || undefined} alt="Profile" />
        <AvatarFallback>{url ? url.charAt(0).toUpperCase() : "U"}</AvatarFallback>
      </Avatar>
      <div>
        <Button asChild variant="outline">
          <label htmlFor="single">
            {uploading ? "Uploading..." : "Change Avatar"}
            <input
              style={{
                visibility: "hidden",
                position: "absolute",
              }}
              type="file"
              id="single"
              accept="image/*"
              onChange={uploadAvatar}
              disabled={uploading}
            />
          </label>
        </Button>
        <p className="text-sm text-muted-foreground mt-2">JPG, GIF or PNG. 1MB max.</p>
      </div>
    </div>
  )
}

export function ProfileSettings({ profile }: { profile: Profile | null }) {
  const { toast } = useToast()
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || null)

  const initialState = { message: null, error: null }
  // This hook is not available in the version of React being used.
  // const [state, dispatch] = useFormState(updateProfile, initialState)

  useEffect(() => {
    setAvatarUrl(profile?.avatar_url || null)
  }, [profile])

  // A simple form submission handler as useFormState is not available.
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    formData.set("avatarUrl", avatarUrl || "")
    const result = await updateProfile(formData)
    if (result?.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Profile updated successfully.",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Update your personal information and profile details</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <AvatarUpload uid={profile?.id || null} url={avatarUrl} onUpload={setAvatarUrl} />

          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" name="fullName" defaultValue={profile?.full_name || ""} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue={profile?.email || ""} disabled />
          </div>

          <Button type="submit">Save Changes</Button>
        </form>
      </CardContent>
    </Card>
  )
}
