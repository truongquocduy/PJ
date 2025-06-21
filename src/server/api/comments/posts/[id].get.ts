import { apiPostComments } from '~/libs/api/blog/post'
import adapterMiddleware from '~/server/middleware/adapter'

export default defineEventHandler(async (event) => {
    await adapterMiddleware(event)

    const id = getRouterParam(event, 'id')

    return apiPostComments(Number(id))
})
