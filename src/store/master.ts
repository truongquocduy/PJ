import { defineStore } from 'pinia'
import type { LicenseQuestion, Order } from '~/types/master'

export const useMasterStore = defineStore('masters', () => {
    const openToc = ref(false)
    const openMenu = ref(false)
    const allLicenseQuestions = ref<LicenseQuestion[]>([])

    // Actions
    const postComment = async (eKey: 'products' | 'posts', eValue: number, body: object) => {
        await $fetch<Order>(`/api/comments/${eKey}/${eValue}`, { method: 'POST', body })
    }

    const commentApi = async (eKey: 'products' | 'posts', eValue: number, callback: CallableFunction, cache: boolean = true) => {
        const data = await $fetch(`/api/comments/${eKey}/${eValue}/?cache=${cache}`)

        callback(data)
    }

    const licenseQuestionApi = async () => {
        const data = await $fetch(`/api/license-test`)
        allLicenseQuestions.value = data
    }

    return {
        openToc,
        openMenu,
        allLicenseQuestions,

        postComment,
        commentApi,
        licenseQuestionApi,
    }
})
