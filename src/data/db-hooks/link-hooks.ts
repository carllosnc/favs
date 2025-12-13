import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NewLink } from "@/types/db-types";
import { createLink, getLinks, deleteLink } from "../db-actions/link-action";

export function useCreateLink(boxId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: NewLink) => createLink(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links", boxId] })
    },
  })
}

export function useLinks(boxId: string) {
  return useQuery({
    queryKey: ["links", boxId],
    queryFn: () => getLinks(boxId),
  })
}

export function useDeleteLink(boxId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteLink(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links", boxId] })
    },
  })
}
