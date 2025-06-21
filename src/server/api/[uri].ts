import adapterMiddleware from '~/server/middleware/adapter'
import { apiAuthor } from '~/libs/api/blog/author'
import { apiSlug } from '~/libs/api/slug'

export default defineEventHandler(async (event) => {
    await adapterMiddleware(event)

    const uri = getRouterParam(event, 'uri') as string

    const response = await apiSlug(uri)

    if (response) return response

    return apiAuthor(uri)
})
