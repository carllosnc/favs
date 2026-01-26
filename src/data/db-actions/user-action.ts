"use server"

import { db } from '@/database'
import { user } from '../db-schemas/auth-schema'
import { eq } from 'drizzle-orm'

export async function getUserByNameSpace(namespace: string) {
  const email = `${namespace}@gmail.com`
  return await db.select({
    name: user.name,
    image: user.image,
  }).from(user).where(eq(user.email, email))
}
