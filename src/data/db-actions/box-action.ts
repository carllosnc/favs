import { db } from '@/database'
import { boxes } from '@/data/db-schemas/box-schema'
import type { Box, NewBox, UpdateBox } from '@/types/db-types'
import { eq, asc, desc, and, sql } from 'drizzle-orm'
import { links } from '../db-schemas/link-schema'

export async function createBox(box: NewBox) {
  return await db.insert(boxes).values(box).returning()
}

export async function getBoxes(userId: string) {
  return await db
    .select()
    .from(boxes)
    .where(eq(boxes.user_id, userId))
    .orderBy(desc(boxes.created_at))
}

export async function getBoxesByNamespace(namespace: string) {
  return await db
    .select()
    .from(boxes)
    .where(sql`${boxes.author_namespace} = ${namespace} AND ${boxes.is_public} = true`)
    .orderBy(asc(boxes.title))
}

export async function getBoxBySlug(namespace: string, slug: string) {
  return await db
    .select()
    .from(boxes)
    .where(sql`${boxes.author_namespace} = ${namespace} AND ${boxes.slug} = ${slug} AND ${boxes.is_public} = true`)
}

export async function getBoxById(id: string, userId: string) {
  const box = await db
    .select()
    .from(boxes)
    .where(and(eq(boxes.id, id), eq(boxes.user_id, userId))).get()

    let allLinks = null

    if(box){
      allLinks = (await db.select().from(links).where(eq(links.box_id, box?.id!))).reverse()
    }

    return { box: box, links: allLinks }
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
