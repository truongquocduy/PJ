import { apiProductsComments } from '~/libs/api/shop/product'
import adapterMiddleware from '~/server/middleware/adapter'

export default defineEventHandler(async (event) => {
    await adapterMiddleware(event)

    const id = getRouterParam(event, 'id')

    return apiProductsComments(Number(id))
})
