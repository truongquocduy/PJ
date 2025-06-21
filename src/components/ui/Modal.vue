<template>
    <Teleport to="body">
        <Transition
            enterActiveClass="transition-opacity duration-300 ease-out"
            enterFromClass="opacity-0"
            enterToClass="opacity-100"
            leaveActiveClass="transition-opacity duration-200 ease-in"
            leaveFromClass="opacity-100"
            leaveToClass="opacity-0"
        >
            <div
                v-if="modelValue"
                class="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
                @click="handleBackdropClick"
            >
                <Transition
                    enterActiveClass="transition-all duration-300 ease-out"
                    enterFromClass="opacity-0 scale-95 translate-y-4"
                    enterToClass="opacity-100 scale-100 translate-y-0"
                    leaveActiveClass="transition-all duration-200 ease-in"
                    leaveFromClass="opacity-100 scale-100 translate-y-0"
                    leaveToClass="opacity-0 scale-95 translate-y-4"
                >
                    <div
                        v-if="modelValue"
                        class="bg-white rounded-lg shadow-xl max-h-[90vh] overflow-hidden flex flex-col"
                        :class="modalClasses"
                        @click.stop
                    >
                        <!-- Modal Header -->
                        <div
                            v-if="$slots.header || title || showCloseButton"
                            class="flex items-center justify-between p-4 border-b border-gray-200"
                        >
                            <div class="flex-1">
                                <slot name="header">
                                    <h3
                                        v-if="title"
                                        class="text-lg font-semibold text-gray-900"
                                    >
                                        {{ title }}
                                    </h3>
                                </slot>
                            </div>
                            <button
                                v-if="showCloseButton"
                                class="ml-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                type="button"
                                @click="closeModal"
                            >
                                <svg
                                    class="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M6 18L18 6M6 6l12 12"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                    />
                                </svg>
                            </button>
                        </div>

                        <!-- Modal Body -->
                        <div class="flex-1 overflow-y-auto p-4">
                            <slot />
                        </div>

                        <!-- Modal Footer -->
                        <div
                            v-if="$slots.footer"
                            class="flex items-center justify-end gap-3 p-4 border-t border-gray-200"
                        >
                            <slot name="footer" />
                        </div>
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
interface Props {
    modelValue: boolean
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
    title?: string
    showCloseButton?: boolean
    closeOnBackdrop?: boolean
}

interface Emits {
    (e: 'update:modelValue', value: boolean): void
    (e: 'close'): void
}

const props = withDefaults(defineProps<Props>(), {
    size: 'md',
    showCloseButton: true,
    closeOnBackdrop: true,
})

const emit = defineEmits<Emits>()

// Computed property for modal size classes
const modalClasses = computed(() => {
    const sizeClasses = {
        sm: 'w-full max-w-sm',
        md: 'w-full max-w-md',
        lg: 'w-full max-w-lg',
        xl: 'w-full max-w-xl',
        full: 'w-full max-w-6xl mx-4',
    }

    return sizeClasses[props.size]
})

// Close modal function
const closeModal = () => {
    emit('update:modelValue', false)
    emit('close')
}

// Handle backdrop click
const handleBackdropClick = () => {
    if (props.closeOnBackdrop) {
        closeModal()
    }
}

// Handle escape key
const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && props.modelValue) {
        closeModal()
    }
}

// Add/remove event listeners
onMounted(() => {
    document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
})

// Prevent body scroll when modal is open
watch(() => props.modelValue, (isOpen) => {
    if (import.meta.client) {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        }
        else {
            document.body.style.overflow = ''
        }
    }
})

// Cleanup on unmount
onUnmounted(() => {
    if (import.meta.client) {
        document.body.style.overflow = ''
    }
})
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
