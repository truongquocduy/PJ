<template>
    <Transition
        enterActiveClass="transition-all duration-300 ease-out"
        enterFromClass="opacity-0 translate-x-full"
        enterToClass="opacity-100 translate-x-0"
        leaveActiveClass="transition-all duration-200 ease-in"
        leaveFromClass="opacity-100 translate-x-0"
        leaveToClass="opacity-0 translate-x-full"
    >
        <div
            v-show="true"
            class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
            :class="toastClasses"
        >
            <div class="p-4">
                <div class="flex items-start">
                    <!-- Icon -->
                    <div class="flex-shrink-0">
                        <component
                            :is="iconComponent"
                            class="h-6 w-6"
                            :class="iconClasses"
                        />
                    </div>

                    <!-- Content -->
                    <div class="ml-3 w-0 flex-1 pt-0.5">
                        <p
                            v-if="toast.title"
                            class="text-sm font-medium text-gray-900"
                        >
                            {{ toast.title }}
                        </p>
                        <p :class="toast.title ? 'mt-1 text-sm text-gray-500' : 'text-sm text-gray-900'">
                            {{ toast.message }}
                        </p>

                        <!-- Actions -->
                        <div
                            v-if="toast.actions && toast.actions.length > 0"
                            class="mt-3 flex space-x-2"
                        >
                            <button
                                v-for="action in toast.actions"
                                :key="action.label"
                                class="text-sm font-medium rounded-md px-3 py-1.5 transition-colors duration-200"
                                :class="getActionClasses(action.style)"
                                @click="action.action"
                            >
                                {{ action.label }}
                            </button>
                        </div>
                    </div>

                    <!-- Close button -->
                    <div class="ml-4 flex-shrink-0 flex">
                        <button
                            class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            @click="$emit('close')"
                        >
                            <span class="sr-only">Close</span>
                            <svg
                                class="h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    clip-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    fill-rule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Progress bar for auto-dismiss -->
            <div
                v-if="!toast.persistent && toast.duration"
                class="h-1 bg-gray-200"
            >
                <div
                    class="h-full transition-all ease-linear"
                    :class="progressBarClasses"
                    :style="{ animationDuration: `${toast.duration}ms` }"
                />
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Toast } from '~/composables/useToast'

interface Props {
    toast: Toast
}

interface Emits {
    (e: 'close'): void
}

const props = defineProps<Props>()
defineEmits<Emits>()

// Toast styling based on type
const toastClasses = computed(() => {
    const baseClasses = 'border-l-4'
    const typeClasses = {
        success: 'border-green-400',
        error: 'border-red-400',
        warning: 'border-yellow-400',
        info: 'border-blue-400',
    }
    return `${baseClasses} ${typeClasses[props.toast.type]}`
})

// Icon component based on type
const iconComponent = computed(() => {
    const icons = {
        success: 'CheckCircleIcon',
        error: 'XCircleIcon',
        warning: 'ExclamationTriangleIcon',
        info: 'InformationCircleIcon',
    }
    return icons[props.toast.type]
})

// Icon classes based on type
const iconClasses = computed(() => {
    const classes = {
        success: 'text-green-400',
        error: 'text-red-400',
        warning: 'text-yellow-400',
        info: 'text-blue-400',
    }
    return classes[props.toast.type]
})

// Progress bar classes
const progressBarClasses = computed(() => {
    const classes = {
        success: 'bg-green-400 animate-toast-progress',
        error: 'bg-red-400 animate-toast-progress',
        warning: 'bg-yellow-400 animate-toast-progress',
        info: 'bg-blue-400 animate-toast-progress',
    }
    return classes[props.toast.type]
})

// Action button classes
const getActionClasses = (style: string = 'secondary') => {
    const styles = {
        primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    }
    return styles[style as keyof typeof styles] || styles.secondary
}
</script>

<style scoped>
@keyframes toast-progress {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}

.animate-toast-progress {
  animation: toast-progress linear forwards;
}
</style>
