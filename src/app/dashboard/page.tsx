import { Button } from "@/components/ui/button";
import{ signOut } from "@/lib/auth-utils"

export default function Dashboard(){
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <h1> FAVS </h1>
      <Button onClick={ signOut }> Sign out </Button>
    </div>
  )
}