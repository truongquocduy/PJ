<script lang="ts" setup>
import type { Product } from '~/libs/api/shop/product'
import { useSettingStore } from '~/store/settingStore'
// import { useSettingStore } from '~/store/settingStore'
// import { useCartStore } from '~/store/cart'

// Props
const props = defineProps<{ node: Product }>()

// Hooks
// const { t } = useI18n()
// const toast = useToast()
// const cartStore = useCartStore()
// const { addCartItem } = cartStore
const { cdnImage, numberFormat } = useHelper()
const { shopCurrency } = storeToRefs(useSettingStore())

// Methods
// const addToCart = () => {
//     addCartItem({
//         checked: false,
//         id: props.node.id,
//         name: props.node.name,
//         slug: props.node.slug,
//         thumbnail: props.node.thumbnail,
//         price: props.node.price,
//         quantity: 1,
//         variant_id: 0,
//     })

//     toast.add({ title: 'Thông báo', description: t('addedToCart', { name: props.node.name }), color: 'info' })
// }
</script>

<template>
    <div class="product">
        <!-- Product Photo -->
        <div class="product__photo">
            <NuxtLink :to="`/${node.slug}`">
                <UiLazyLoad
                    alt="node.name"
                    class="w-full"
                    :src="cdnImage(String(node.thumbnail), { s: '_w300' })"
                />
            </NuxtLink>
        </div>

        <!-- Product Description -->
        <div class="product__description relative w-full">
            <NuxtLink :to="`/${node.slug}`">
                <div class="product__title">{{ node.name }}</div>
                <span>{{ numberFormat(node.price) }} {{ shopCurrency }}</span>

                <div class="flex justify-center mt-2">
                    <UiRating :stars="5" />
                </div>
            </NuxtLink>

            <slot name="product-description" />

            <button class="btn bg-amber-600 p-2 uppercase text-[10px] text-white cursor-pointer block">
                {{ $t('addToCard') }}
            </button>
        </div>
    </div>
</template>
