"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

/**
 * LOG IN
 * ------------------------------------------------------------------ */
export async function login(_prevState: any, formData: FormData) {
  const supabase = createClient()
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    throw new Error(error.message)
  }

  // refresh caches and send the user to the dashboard
  revalidatePath("/", "layout")
  redirect("/")
}

/**
 * SIGN UP
 * ------------------------------------------------------------------ */
export async function signup(_prevState: any, formData: FormData) {
  const supabase = createClient()
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // ── build an absolute redirect URL for the confirmation email
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${baseUrl}/auth/callback` },
  })

  if (error) {
    throw new Error(error.message)
  }

  // for demo purposes we immediately send users to the dashboard
  revalidatePath("/", "layout")
  redirect("/")
}

/**
 * LOG OUT
 * ------------------------------------------------------------------ */
export async function logout() {
  const supabase = createClient()
  await supabase.auth.signOut()
  redirect("/login")
}
