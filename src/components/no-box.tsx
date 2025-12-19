import { BsBoxes } from "react-icons/bs";

export function NoBox() {
  return (
    <div className="flex m-auto flex-col pt-[30px] justify-between items-center text-center gap-[15px] w-full max-w-[600px]" >
      <span className="text-sm text-neutral-600"> No box yet </span>
      <BsBoxes className="text-[70px] text-neutral-300" />
    </div>
  )
}