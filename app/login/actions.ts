"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

/**
 * LOG IN  ------------------------------------------------------------------ */
export async function login(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const supabase = createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/", "layout")
  redirect("/")
}

/**
 * SIGN UP  ---------------------------------------------------------------- */
export async function signup(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const supabase = createClient()

  /* Build an ABSOLUTE redirect URL for Supabase e-mails */
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

  revalidatePath("/", "layout")
  redirect("/")
}

/**
 * LOG OUT  ----------------------------------------------------------------- */
export async function logout() {
  const supabase = createClient()
  await supabase.auth.signOut()
  redirect("/login")
}
