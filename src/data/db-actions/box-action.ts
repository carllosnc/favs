import { db } from '@/database'
import { boxes } from '@/data/db-schemas/box-schema'
import type { Box, NewBox, UpdateBox } from '@/types/db-types'
import { eq, asc, desc, and } from 'drizzle-orm'

export async function createBox(box: NewBox) {
  return await db.insert(boxes).values(box).returning()
}

export async function getBoxes(userId: string) {
  return await db
    .select()
    .from(boxes)
    .where(eq(boxes.user_id, userId))
    .orderBy(asc(boxes.created_at))
}

export async function getBoxesByNamespace(namespace: string) {
  return await db
    .select()
    .from(boxes)
    .where(eq(boxes.author_namespace, namespace))
    .orderBy(asc(boxes.created_at))
}

export async function getBoxBySlug(namespace: string, slug: string) {
  return await db
    .select()
    .from(boxes)
    .where(and(eq(boxes.author_namespace, namespace), eq(boxes.slug, slug)))
}

export async function getBoxById(id: string, userId: string) {
  return await db
    .select()
    .from(boxes)
    .where(and(eq(boxes.id, id), eq(boxes.user_id, userId)))
}

export async function updateBox(userId: string, box: UpdateBox) {
  return await db
    .update(boxes)
    .set(box)
    .where(and(eq(boxes.user_id, userId), eq(boxes.id, box.id)))
    .returning()
}

export async function deleteBox(userId: string, box: Box) {
  return await db
    .delete(boxes)
    .where(and(eq(boxes.user_id, userId), eq(boxes.id, box.id)))
    .returning()
}
