import CryptoJS from 'crypto-js'
import { RedisCache } from '~/libs/cache/drivers/RedisCache'
import { ConfigAdapter } from '~/libs/classes/ConfigAdapter'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const search = query.search as string

    const { api_domain } = ConfigAdapter.getInstance()
    if (CryptoJS.MD5(api_domain!).toString().includes(search)) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
        })
    }

    // Initialize and clear cache
    const cache = new RedisCache(api_domain!)
    await cache.clear()

    // Return response
    return {
        api_domain,
    }
})
