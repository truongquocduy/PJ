import { defineStore } from 'pinia'
import type { Setting } from '~/libs/api/setting'

export const useSettingStore = defineStore('settings', () => {
    const settings = ref<Setting | null>()

    // Getters
    const shopName = computed(() => settings.value?.['general.app_name'])
    const shopLogo = computed(() => settings.value?.app_info.logo)
    const shopCurrency = computed(() => settings.value?.['shop.currency'])
    const googleTagId = computed(() => settings.value?.['general.google_tag_id'])

    // Actions
    const settingApi = async () => {
        const { data } = await useFetch<Setting>('/api/settings')
        settings.value = data.value
    }

    const getSocialKey = (key: string) => {
        return settings.value?.[`general.social_${key}`]
    }

    return {
        settings,
        shopName,
        shopLogo,
        shopCurrency,
        googleTagId,

        settingApi,
        getSocialKey,
    }
})
