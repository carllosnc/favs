import { useQuery } from "@tanstack/react-query";
import { getUserByNameSpace } from "../db-actions/user-action";

export function useUser(namespace: string) {
  return useQuery({
    queryKey: ["user", namespace],
    queryFn: () => getUserByNameSpace(namespace),
  })
}
