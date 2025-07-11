"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function updateProfile(formData: FormData) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "You must be logged in to update your profile." }
  }

  const fullName = formData.get("fullName") as string
  const avatarUrl = formData.get("avatarUrl") as string

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: fullName,
      avatar_url: avatarUrl,
    })
    .eq("id", user.id)

  if (error) {
    console.error("Error updating profile:", error)
    return { error: "Failed to update profile." }
  }

  revalidatePath("/settings")
  revalidatePath("/(dashboard)", "layout") // Revalidate the layout to update header avatar
  return { success: "Profile updated successfully." }
}
