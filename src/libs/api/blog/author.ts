import type { Meta } from '../seo'
import { ApiMain } from '~/libs/classes/ApiMain'

const API_PATH = 'author'

export interface Author {
    view?: string
    id: number
    slug: string
    name: string
    avatar: string
    thumbnail?: string
    bio: string
    google_schema: object
    meta: Meta
    params: {
        profile?: {
            x?: string
            tiktok?: string
            website?: string
            facebook?: string
            instagram?: string
            pinterest?: string
        }
    }
}

export async function apiAuthor(slug: string): Promise<Author> {
    return await ApiMain.getInstance().callApi(`${API_PATH}/${slug}`) as Author
}
