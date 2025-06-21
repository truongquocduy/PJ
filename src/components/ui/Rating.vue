<script lang="ts" setup>
const MAX_RATING = 5

defineProps({
    stars: {
        type: Number,
        required: true,
    },
})
</script>

<template>
    <div class="flex space-x-1.5">
        <span
            v-for="index in MAX_RATING"
            :key="index"
        >

            <UiIcon
                class="text-yellow-600 p-1"
                name="brand-twitter"
                size="lg"
            />

            <!-- <IconCarambolaFilled :class="{ active: index <= stars }" /> -->
        </span>
    </div>
</template>
