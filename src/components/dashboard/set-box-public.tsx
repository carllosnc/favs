import { Box } from "@/types/db-types";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { useContext, useState } from "react";
import { useUpdateBox } from "@/data/db-hooks/box-hooks";
import { SessionContext } from "@/context/session-context";

type Props = {
  box: Box
}

export function SetBoxPublic({ box }: Props) {
  const session = useContext(SessionContext)

  const [ isPublic, setIsPublic ] = useState<0 | 1>(box.is_public ? 1 : 0)
  const { mutate, isPending  } = useUpdateBox(
    { userId: session!.user.id!, boxId: box.id }
  )

  return (
    <div className="flex flex-col gap-2.5 mr-5">
      <label className="inline-flex gap-1.5 items-center">
        <div className="flex items-center space-x-2">
          <Switch
            disabled={isPending}
            checked={isPublic === 1}
            onCheckedChange={() => {
              setIsPublic(() => {
                const newBox = structuredClone(box)
                newBox.is_public = isPublic === 0 ? 1 : 0
                mutate(newBox)
                return isPublic === 0 ? 1 : 0
              })
          }} id="public" />
          <Label htmlFor="public">
            {isPublic === 0 ? 'Private' : 'Public'}
          </Label>
        </div>
      </label>
    </div>
  )
}