<script setup lang="ts">
import type { Post } from '~/libs/api/blog/post'

interface Props {
    name: string
    data: Post[]
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

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 md:gap-4 mt-4 md:mt-0">
            <div
                v-for="post in data"
                :key="post.id"
            >
                <TemplateBlogCard
                    :author="post.author"
                    :categories="post.categories"
                    :description="post.description"
                    :href="`/${post.slug}`"
                    :name="post.title"
                    :publishedAt="post.published_at"
                    :thumbnail="post.thumbnail"
                />
            </div>
        </div>
    </section>
</template>
