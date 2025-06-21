import adapterMiddleware from '~/server/middleware/adapter'
import { apiPostComment } from '~/libs/api/blog/post'

const validateId = (id: string | undefined): number => {
    const numId = Number(id)

    if (!id || isNaN(numId)) {
        throw createError({
            statusCode: 400,
            message: 'Invalid ID parameter',
        })
    }

    return numId
}

export default defineEventHandler(async (event) => {
    await adapterMiddleware(event)

    const body = await readBody(event)

    const id = validateId(getRouterParam(event, 'id'))

    return apiPostComment(id, body)
})
