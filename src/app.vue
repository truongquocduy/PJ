<script lang="ts" setup>
import { useSettingStore } from '~/store/settingStore'

// Composables
const { cdnImage } = useHelper()
const settingStore = useSettingStore()
const { settingApi } = settingStore

callOnce(async () => {
    settingApi()
})

useHead({
    title: settingStore.settings?.['general.app_name'],

    meta: [
        {
            name: 'description',
            content: settingStore.settings?.['general.seo_description'] as string,
        },
        {
            name: 'keywords',
            content: settingStore.settings?.['general.seo_keywords'] as string,
        },
        {
            name: 'robots',
            content: settingStore.settings?.['general.seo_robots'],
        },
    ],

    link: [
        {
            rel: 'icon',
            type: 'image/png',
            href: cdnImage(String(settingStore.settings?.app_info.favicon), { s: '_w300' }),
        },
    ],

    script: [
        { innerHTML: 'console.log(\'%cWelcome to Website\', \'color: #ff0000; font-size: 20px; font-weight: bold;\');' },
    ],

    htmlAttrs: {
        lang: settingStore.settings?.app_info.language || 'vi',
    },
})
</script>

<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>
