import { db } from '@/database'
import { user } from '../db-schemas/auth-schema'
import { eq, asc, desc } from 'drizzle-orm'

export async function getUserByNameSpace(namespace: string) {
  const email = `${namespace}@gmail.com`
  return await db.select().from(user).where(eq(user.email, email))
}
