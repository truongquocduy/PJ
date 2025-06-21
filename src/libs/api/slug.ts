import { ApiMain } from '../classes/ApiMain'
import type { Author } from './blog/author'
import type { Category } from './blog/category'
import type { Post } from './blog/post'
import type { Product } from './shop/product'
import type { Category as ShopCategory } from './shop/category'

const API_PATH = 'slug'

export async function apiSlug(slug: string): Promise<Post | Category | Author | Product | ShopCategory | null> {
    if (slug.includes('.')) {
        return null
    }

    return (await ApiMain.getInstance().callApi(`${API_PATH}/${slug}`)) || null
}
