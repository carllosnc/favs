"use client"

import { googleSignIn } from "@/lib/auth-utils"
import { Button } from "./ui/button"
import { FcGoogle } from "react-icons/fc"

export function SignInButton(){
  return (
    <Button variant="outline" onClick={() => { googleSignIn() }}>
      <FcGoogle /> Sign with Google
    </Button>
  )
}