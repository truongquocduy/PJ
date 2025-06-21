import type { Comment, CommnentParams } from '../blog/post'
import type { Category } from './category'
import { ApiMain } from '~/libs/classes/ApiMain'

const API_PATH = 'shop/products'

export interface Product {
    view?: string
    id: number
    slug: string
    name: string
    summary: string
    description: string
    price: number
    thumbnail?: string
    content: string
    published_at: string
    updated_at: string
    google_schema: object
    images: string[]
    categories: Category[]
    category: Category
    variants: Variants[]
    related_posts: Product[]
    recommended_products: Product[]
    linked_products: Product[]
}

export interface Variants {
    id: number
    sku: string
    sale_price: number
    compare_at_price: number
    stocks: number
    position: number
    option_values: string[]
    image: string
}

export interface Params {
    category?: number
    author?: number
    page?: number
}

export async function apiProducts(params: Params = {}): Promise<Product[]> {
    return await ApiMain.getInstance().callApi(`${API_PATH}/`, params) as Product[]
}

export async function apiProductCategories(categories: string): Promise<Product[]> {
    return await ApiMain.getInstance().callApi(`${API_PATH}/?category=${categories}`) as Product[]
}

export async function apiProduct(slug: string): Promise<Product> {
    return await ApiMain.getInstance().callApi(`${API_PATH}/${slug}`) as Product
}

export async function apiPostComment(id: number, body: CommnentParams): Promise<boolean> {
    return await ApiMain.getInstance().postApi(`comments/products/${id}`, body) as boolean
}

export async function apiProductsComments(id: number): Promise<Comment[]> {
    return await ApiMain.getInstance().callApi(`comments/products/${id}`, {}, false) as Comment[]
}
