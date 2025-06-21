import { defineEventHandler } from 'h3'
import { apiSetting } from '~/libs/api/setting'
import adapterMiddleware from '~/server/middleware/adapter'

export default defineEventHandler(async (event) => {
    await adapterMiddleware(event)

    const setting = await apiSetting()
    setHeader(event, 'Content-Type', 'text/plain')

    return setting['general.seo_robots']
})
