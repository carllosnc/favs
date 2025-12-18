import { Spinner } from "./ui/spinner";

export default function Loading(){
  return (
    <div className="flex flex-1 justify-center items-center" >
      <Spinner className="size-6" />
    </div>
  )
}
