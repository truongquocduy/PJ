import { defineEventHandler } from 'h3'
import { APP_DEFAULT_LANGUAGE } from '~/libs/constants'
import { getRoute } from '~/libs/helpers'
import adapterMiddleware from '~/server/middleware/adapter'

export default defineEventHandler(async (event) => {
    await adapterMiddleware(event)

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    `
    for (const type of ['pages', 'posts', 'categories']) {
        sitemap += `    <sitemap>
            <loc>${getRoute(`/sitemap/${APP_DEFAULT_LANGUAGE}-${type}.xml`)}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
        </sitemap>
    `
    }

    sitemap += `</sitemapindex>`

    setHeader(event, 'Content-Type', 'text/xml')

    return sitemap
})
