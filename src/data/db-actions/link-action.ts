import { db } from '@/database'
import type { NewLink, Link, Box } from '@/types/db-types'
import { links } from '@/data/db-schemas/link-schema'
import { boxes } from '@/data/db-schemas/box-schema'
import { eq, and, sql } from 'drizzle-orm'

export async function createLink(link: NewLink) {
  const newLink = await db.insert(links).values(link).returning()

  await db
    .update(boxes)
    .set({ total_links: sql`${boxes.total_links} + 1` })
    .where(and(eq(boxes.id, link.box_id), eq(boxes.user_id, link.user_id)))
    .returning()

  return newLink
}

export async function getLinks(boxId: string) {
  const allLinks = (await db.select().from(links).where(eq(links.box_id, boxId))).reverse()
  return allLinks
}

export async function deleteLink(linkId: string) {
  const deleted = await db.delete(links).where(eq(links.id, linkId)).returning()

  await db
    .update(boxes)
    .set({ total_links: sql`${boxes.total_links} - 1` })
    .where(and(eq(boxes.id, deleted[0].box_id), eq(boxes.user_id, deleted[0].user_id)))
    .returning()

  return deleted
}

export async function moveLink(link: NewLink, oldLinkId: string) {
  await createLink(link)
  await deleteLink(oldLinkId)
}
