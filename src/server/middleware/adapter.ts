import { ConfigAdapter } from '~/libs/classes/ConfigAdapter'

export default defineEventHandler(async (event) => {
    ConfigAdapter.getInstance().setEvent(event)
})
