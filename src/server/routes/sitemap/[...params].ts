import { defineEventHandler, createError, getRouterParam } from 'h3'
import { xmlSitemap } from '~/libs/api/seo'
import adapterMiddleware from '~/server/middleware/adapter'

export default defineEventHandler(async (event) => {
    await adapterMiddleware(event)

    const params = getRouterParam(event, 'params') || ''

    const match = params.match(/^([^-]+)-([^.]+)\.xml$/)
    if (!match) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Not Found',
        })
    }

    const [, language, type] = match

    // Validate type
    if (!['pages', 'posts', 'categories'].includes(type)) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Not Found',
        })
    }

    setHeader(event, 'Content-Type', 'text/xml')

    return await xmlSitemap(language, type)
})
