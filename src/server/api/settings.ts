import { apiSetting } from '~/libs/api/setting'
import adapterMiddleware from '~/server/middleware/adapter'

export default defineEventHandler(async (event) => {
    await adapterMiddleware(event)

    return apiSetting()
})
