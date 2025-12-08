"use client"

import { createAuthClient } from "better-auth/client"
import { redirect } from 'next/navigation'

const authClient = createAuthClient()

export const googleSignIn = async () => {
  const data = await authClient.signIn.social({
    callbackURL: "/dashboard",
    provider: "google",
  })
}

export const signOut = async () => {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        redirect('/sign-in')
      }
    }
  })
}
