import { db } from '@/database'
import type { NewLink } from '@/types/db-types'
import { links } from '@/data/db-schemas/link-schema'
import { eq, and } from 'drizzle-orm'

export async function createLink(link: NewLink) {
  return await db.insert(links).values(link).returning()
}

export async function getLinks(boxId: string) {
  return (
    await db.select().from(links).where(eq(links.box_id, boxId))
  ).reverse()
}

export async function deleteLink(id: string) {
  return await db.delete(links).where(eq(links.id, id)).returning()
}
