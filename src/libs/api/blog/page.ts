import type { Meta } from '../seo'
import type { Author } from './author'

export interface Page {
    view?: string
    id: number
    slug: string
    title: string
    description: string
    content: string
    thumbnail: string
    published_at: string
    updated_at: string
    google_schema: object
    meta: Meta
    author: Author
    reviewed_by: Author
}
