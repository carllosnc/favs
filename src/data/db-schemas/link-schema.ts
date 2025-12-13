import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { boxes } from './box-schema'

export const links = sqliteTable('links', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  box_id: text('box_id')
    .notNull()
    .references(() => boxes.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  user_id: text('user_id').notNull(),
  created_at: text('created_at').default(Date().toString()),
  title: text('title'),
  url: text('url').notNull(),
  description: text('description'),
  image: text('image'),
})