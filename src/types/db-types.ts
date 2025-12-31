import { boxes } from '@/data/db-schemas/box-schema'
import { links } from '@/data/db-schemas/link-schema'

export type Box = typeof boxes.$inferSelect
export type NewBox = typeof boxes.$inferInsert
export type Link = typeof links.$inferSelect
export type NewLink = typeof links.$inferInsert
export type UpdateBox = {
  id: string
  title: string
  description: string | null
}

export type SiteMetadata = {
  url: string
  title: string | null
  description: string | null
  keywords: string | null
  image: string | null
  favicon: string | null
}

export type YouTubeMetadata = {
  title: string
  url: string
  author_name: string
  author_url: string
  type?: string
  height?: number
  width?: number
  version?: string
  provider_name?: string
  provider_url?: string
  thumbnail_height?: number
  thumbnail_width?: number
  thumbnail_url?: string
  html?: string
}