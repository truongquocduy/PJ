<script setup lang="ts">
import type { Product } from '~/libs/api/shop/product'

interface Props {
    name: string
    data: { products: Product[], categoryIds: Array<number> }
}

defineProps<Props>()
</script>

<template>
    <section class="py-6">
        <div class="flex justify-between items-center flex-wrap space-y-1">
            <div>
                <h4 class="text-xl mb-2">
                    {{ name }}
                </h4>
                <p class="mb-4">
                    {{ $t('productDescription') }}
                </p>
            </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1 md:gap-4 mt-4 md:mt-0">
            <div
                v-for="product in data.products"
                :key="product.id"
            >
                <TemplateProductCard :node="product" />
            </div>
        </div>
    </section>
</template>
