import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteBox,
  getBoxes,
  getBoxById,
  createBox,
  getBoxesByNamespace,
  updateBox,
  getBoxBySlug,
} from "../db-actions/box-action";
import { Box, NewBox, UpdateBox } from "@/types/db-types";

export function useBoxes(userId: string) {
  return useQuery({
    queryKey: ["boxes"],
    queryFn: () => getBoxes(userId),
  })
}

export function useBoxesByNamespace(namespace: string) {
  return useQuery({
    queryKey: ["boxes", namespace],
    queryFn: () => getBoxesByNamespace(namespace),
  })
}

export function useBoxBySlug(namespace: string, slug: string) {
  return useQuery({
    queryKey: ["box", namespace, slug],
    queryFn: () => getBoxBySlug(namespace, slug),
  })
}

export function useBox(boxId: string, userId: string) {
  return useQuery({
    queryKey: ["box", boxId],
    queryFn: () => getBoxById(boxId, userId),
    enabled: !!boxId, // Only fetch if ID is provided
  })
}

export function useCreateBox() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: NewBox) => createBox(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boxes"] })
    },
  })
}

export function useUpdateBox({ userId, boxId }: { userId: string, boxId: string }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateBox) => updateBox(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["box", boxId] })
    },
  })
}

export function useDeleteBox({ userId }: { userId: string }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (box: Box) => deleteBox(userId, box),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boxes"] })
    },
  })
}
