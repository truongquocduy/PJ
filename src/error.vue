<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
    error: Object as () => NuxtError,
})

const handleError = () => clearError({ redirect: '/' })

useHead({
    title: `${props.error?.statusCode} - ${props.error?.statusMessage}`,
})
</script>

<template>
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6 text-center">
        <h1 class="text-9xl font-extrabold text-(--ui-primary) tracking-widest">
            {{ error?.statusCode || 'Lỗi' }}
        </h1>

        <div class="bg-(--ui-primary) px-2 text-sm rounded rotate-12 absolute mt-[-2rem] text-white">
            Oops!
        </div>

        <p class="text-2xl mt-4 mb-8">
            {{ error?.statusMessage || 'Có lỗi xảy ra hoặc không tìm thấy trang.' }}
        </p>

        <button
            class="btn px-6 py-2 bg-green-600 text-white rounded bg-(--ui-primary):bg-blue-700 transition duration-200"
            @click="handleError"
        >
            {{ $t('goBackHome') }}
        </button>
    </div>
</template>
