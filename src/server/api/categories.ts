import { apiCategories } from '~/libs/api/shop/category'
import adapterMiddleware from '~/server/middleware/adapter'

export default defineEventHandler(async (event) => {
    await adapterMiddleware(event)

    return apiCategories()
})
