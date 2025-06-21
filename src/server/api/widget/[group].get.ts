import { apiWidget } from '~/libs/api/blog/widget'
import adapterMiddleware from '~/server/middleware/adapter'

export default defineEventHandler(async (event) => {
    await adapterMiddleware(event)
    const group = getRouterParam(event, 'group') as string

    return await apiWidget(group)
})
