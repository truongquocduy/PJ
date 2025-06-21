<template>
    <Teleport to="body">
        <div
            aria-live="assertive"
            class="fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end z-50"
        >
            <div class="w-full flex flex-col items-center space-y-4 sm:items-end">
                <UiToast
                    v-for="toast in toasts"
                    :key="toast.id"
                    :toast="toast"
                    @close="removeToast(toast.id)"
                />
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import { useToast } from '~/composables/useToast'

const { toasts, removeToast } = useToast()
</script>
