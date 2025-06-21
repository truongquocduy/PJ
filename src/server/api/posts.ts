import type { Params } from '~/libs/api/blog/post'
import { apiPosts } from '~/libs/api/blog/post'
import adapterMiddleware from '~/server/middleware/adapter'

export default defineEventHandler(async (event) => {
    await adapterMiddleware(event)

    const query = getQuery(event)

    const params: Params = { ...query }

    return apiPosts(params)
})
