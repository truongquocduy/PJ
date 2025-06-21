import { apiCheckout } from '~/libs/api/shop/checkout'
import adapterMiddleware from '~/server/middleware/adapter'

export default defineEventHandler(async (event) => {
    await adapterMiddleware(event)

    const body = await readBody(event)

    return apiCheckout(body)
})
