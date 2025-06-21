import type { DropdownMenuItem } from '@nuxt/ui'
import type { EstimateData, InstallmentPaymentData } from '~/libs/api/contact'
import type { Category } from '~/libs/api/shop/category'

function formatCategoryTree(categories: Category[]): DropdownMenuItem[][] {
    return categories.map((category) => {
        const item: DropdownMenuItem = {
            label: category.name,
            to: category.slug,
            children: [],
        }

        if (category.children && category.children.length > 0) {
            const children = formatCategoryTree(category.children)
            item.children = children
        }

        return [item] // mỗi item là 1 mảng chứa object
    })
}

export const useProductStore = defineStore('products', () => {
    const categories = ref<Category[]>([])

    // Getters
    const categoriesFormat = computed(() => {
        return formatCategoryTree(categories.value)
    })

    // Actions
    const categoriesApi = async () => {
        const data = await $fetch<Category[]>('/api/categories')
        categories.value = data
    }

    const postContacts = async (body: EstimateData | InstallmentPaymentData) => {
        await $fetch<boolean>('/api/contacts', { method: 'POST', body })
    }

    return {
        categories,
        categoriesFormat,

        categoriesApi,
        postContacts,
    }
})
