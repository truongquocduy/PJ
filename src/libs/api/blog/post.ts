import type { Meta } from '../seo'
import type { Author } from './author'
import type { Category } from './category'
import { ApiMain } from '~/libs/classes/ApiMain'

const API_PATH = 'posts'

export interface Post {
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
    categories: Category[]
    related_posts: Post[]
    recommended_posts: Post[]
}

export interface Params {
    category?: number
    author?: number
    page?: number
}

export interface CommnentParams {
    parent_id?: number
    name: string
    content: string
}

export interface Comment {
    id: number
    name: string
    content: string
    replies: Comment[]
    created_at: string
    replyToName?: string
}

export async function apiPosts(params: Params = {}): Promise<Post[]> {
    return await ApiMain.getInstance().callApi(API_PATH, params) as Post[]
}

export async function apiPost(slug: string): Promise<Post> {
    return await ApiMain.getInstance().callApi(`${API_PATH}${slug}`) as Post
}

export async function apiPostComment(id: number, body: CommnentParams): Promise<boolean> {
    return (await ApiMain.getInstance().postApi(`comments/${API_PATH}/${id}`, body)) || {}
}

export async function apiPostComments(id: number): Promise<Comment[]> {
    return await ApiMain.getInstance().callApi(`comments/${API_PATH}/${id}`, {}, false) as Comment[]
}
