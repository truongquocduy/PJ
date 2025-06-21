import adapterMiddleware from '~/server/middleware/adapter'
import { apiProductCategories } from '~/libs/api/shop/product'

export default defineEventHandler(async (event) => {
    await adapterMiddleware(event)

    const categories = getRouterParam(event, 'categories') as string

    return apiProductCategories(categories)
})
