"use server"

import { db } from '@/database'
import type { NewLink, Link, Box } from '@/types/db-types'
import { links } from '@/data/db-schemas/link-schema'
import { boxes } from '@/data/db-schemas/box-schema'
import { eq, and, sql } from 'drizzle-orm'
import { headers } from "next/headers"
import { auth } from "@/lib/auth"

async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (!session) throw new Error("Unauthorized")
  return session
}

export async function createLink(link: NewLink) {
  const session = await getSession()
  
  // Verify box ownership before inserting link
  const box = await db.select().from(boxes).where(and(eq(boxes.id, link.box_id), eq(boxes.user_id, session.user.id))).get()
  if(!box) throw new Error("Box not found or unauthorized")

  const newLinkData = { ...link, user_id: session.user.id }

  const newLink = await db.insert(links).values(newLinkData).returning()

  await db
    .update(boxes)
    .set({ total_links: sql`${boxes.total_links} + 1` })
    .where(eq(boxes.id, link.box_id))
    .returning()

  return newLink
}

export async function getLinks(boxId: string) {
  const session = await getSession()
  const allLinks = (await db.select().from(links).where(and(eq(links.box_id, boxId), eq(links.user_id, session.user.id)))).reverse()
  return allLinks
}

export async function deleteLink(linkId: string) {
  const session = await getSession()
  
  const deleted = await db.delete(links).where(and(eq(links.id, linkId), eq(links.user_id, session.user.id))).returning()
  
  if (deleted.length > 0) {
      await db
        .update(boxes)
        .set({ total_links: sql`${boxes.total_links} - 1` })
        .where(eq(boxes.id, deleted[0].box_id))
        .returning()
  }

  return deleted
}

export async function moveLink(link: NewLink, oldLinkId: string) {
  // These internal calls will now enforce session checks
  await createLink(link)
  await deleteLink(oldLinkId)
}
