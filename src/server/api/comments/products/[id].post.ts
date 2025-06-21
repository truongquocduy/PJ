import { apiPostComment } from '~/libs/api/shop/product'
import adapterMiddleware from '~/server/middleware/adapter'

const validateId = (id: string | undefined, recaptchaToken: string): number => {
    const numId = Number(id)
    if (!id || (isNaN(numId) && !recaptchaToken)) {
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

    const id = validateId(getRouterParam(event, 'id'), body.recaptchaToken)

    return apiPostComment(id, body)
})
