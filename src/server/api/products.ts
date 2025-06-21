import type { Params } from '~/libs/api/shop/product'
import { apiProducts } from '~/libs/api/shop/product'
import adapterMiddleware from '~/server/middleware/adapter'

export default defineEventHandler(async (event) => {
    await adapterMiddleware(event)

    const query = getQuery(event)

    const params: Params = { ...query }

    return apiProducts(params)
})
