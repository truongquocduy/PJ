import { apiEstimatePrice } from '~/libs/api/contact'
import adapterMiddleware from '~/server/middleware/adapter'

export default defineEventHandler(async (event) => {
    await adapterMiddleware(event)

    const body = await readBody(event)

    return apiEstimatePrice(body)
})
