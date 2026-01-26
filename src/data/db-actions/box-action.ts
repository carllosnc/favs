"use server"

import { db } from '@/database'
import { boxes } from '@/data/db-schemas/box-schema'
import type { Box, NewBox, UpdateBox } from '@/types/db-types'
import { eq, asc, desc, and, sql } from 'drizzle-orm'
import { links } from '../db-schemas/link-schema'
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { getNamespace } from "@/lib/utils"

async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (!session) throw new Error("Unauthorized")
  return session
}

export async function createBox(box: NewBox) {
  const session = await getSession()

  const newBox: NewBox = {
      ...box,
      user_id: session.user.id,
      author_name: session.user.name,
      author_namespace: getNamespace(session.user.email)
  }

  return await db.insert(boxes).values(newBox).returning()
}

export async function getBoxes() {
  const session = await getSession()
  return await db
    .select()
    .from(boxes)
    .where(eq(boxes.user_id, session.user.id))
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
  const box = await db
    .select()
    .from(boxes)
    .where(sql`${boxes.author_namespace} = ${namespace} AND ${boxes.slug} = ${slug} AND ${boxes.is_public} = true`).get()

  let allLinks = null

  if(box){
    allLinks = (await db.select().from(links).where(eq(links.box_id, box?.id!))).reverse()
  }

  return { box: box, links: allLinks }
}

export async function getBoxById(id: string) {
  const session = await getSession()
  const box = await db
    .select()
    .from(boxes)
    .where(and(eq(boxes.id, id), eq(boxes.user_id, session.user.id))).get()

    let allLinks = null

    if(box){
      allLinks = (await db.select().from(links).where(eq(links.box_id, box?.id!))).reverse()
    }

    return { box: box, links: allLinks }
}

export async function updateBox(box: UpdateBox) {
  const session = await getSession()
  return await db
    .update(boxes)
    .set(box)
    .where(and(eq(boxes.user_id, session.user.id), eq(boxes.id, box.id)))
    .returning()
}

export async function deleteBox(box: Box) {
  const session = await getSession()
  return await db
    .delete(boxes)
    .where(and(eq(boxes.user_id, session.user.id), eq(boxes.id, box.id)))
    .returning()
}
