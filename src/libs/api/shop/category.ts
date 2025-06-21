import { ApiMain } from '~/libs/classes/ApiMain'

const API_PATH = 'shop/categories'

export interface Category {
    view?: string
    id: number
    slug: string
    name: string
    description: string
    thumbnail?: string
    content: string
    published_at: string
    updated_at: string
    google_schema: object
    children: Category[]
}

export async function apiCategories(): Promise<Category[]> {
    return (await ApiMain.getInstance().callApi(`${API_PATH}/`)) as Category[]
}

export async function apiCategory(slug: string): Promise<Category> {
    return await ApiMain.getInstance().callApi(`${API_PATH}/${slug}`) as Category
}
