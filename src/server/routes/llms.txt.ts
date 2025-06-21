import { defineEventHandler } from 'h3'
import { xmlSitemapLLMS } from '~/libs/api/seo'
import adapterMiddleware from '~/server/middleware/adapter'

export default defineEventHandler(async (event) => {
    await adapterMiddleware(event)
    setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')

    return await xmlSitemapLLMS()
})
