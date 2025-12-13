import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getNamespace(email: string) {
  const namespace = email.split('@')[0]
  return namespace
}

export function getSlug(title: string) {
  const slug = title.toLowerCase().replaceAll(' ', '-')
  return slug
}

export function formatDate(date: string) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return formatter.format(new Date(date))
}
