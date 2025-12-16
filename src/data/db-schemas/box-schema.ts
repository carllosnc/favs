import { sql } from 'drizzle-orm'
import { int, sqliteTable, text, unique } from 'drizzle-orm/sqlite-core'

export const boxes = sqliteTable('boxes', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text('title').notNull(),
  slug: text('slug').notNull(),
  description: text('description'),
  user_id: text('user_id'),
  author_name: text('author_name'),
  author_namespace: text('author_namespace'),
  total_links: int('total_links').default(0),
  is_public: int('is_public').default(1),
  created_at: text('created_at').notNull().default(sql`(current_timestamp)`),
}, (table) => {
  return {
    unique_box: unique('unique_box')
    .on(table.user_id, table.slug, table.author_namespace),
  }
})
