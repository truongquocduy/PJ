<template>
    <div
        ref="containerRef"
        class="relative overflow-hidden"
        :class="containerClasses"
    >
        <!-- Placeholder/Loading state -->
        <div
            v-if="!imageLoaded && !imageError"
            class="absolute inset-0 flex items-center justify-center"
        >
            <div
                v-if="showSkeleton"
                class="animate-pulse bg-gray-200 w-full h-full"
            />
            <div
                v-else
                class="flex flex-col items-center justify-center text-gray-400"
            >
                <svg
                    class="w-12 h-12 mb-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        clip-rule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        fill-rule="evenodd"
                    />
                </svg>
                <span class="text-sm">Loading...</span>
            </div>
        </div>

        <!-- Error state -->
        <div
            v-if="imageError"
            class="absolute inset-0 flex items-center justify-center text-gray-400"
        >
            <div class="flex flex-col items-center justify-center">
                <svg
                    class="w-12 h-12 mb-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        clip-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        fill-rule="evenodd"
                    />
                </svg>
                <span class="text-sm">Failed to load</span>
            </div>
        </div>

        <!-- Actual image -->
        <Transition
            enterActiveClass="transition-opacity duration-500 ease-in-out"
            enterFromClass="opacity-0"
            enterToClass="opacity-100"
        >
            <img
                v-show="shouldLoadImage && imageLoaded"
                :alt="alt"
                class="w-full h-full transition-opacity duration-500"
                :class="imageClasses"
                :decoding="decoding"
                :loading="loadingStrategy"
                :sizes="sizes"
                :src="src"
                :srcset="srcset"
                @error="handleImageError"
                @load="handleImageLoad"
            />
        </Transition>

        <!-- Overlay slot -->
        <div
            v-if="$slots.overlay"
            class="absolute inset-0"
        >
            <slot name="overlay" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

interface Props {
    src: string
    alt?: string
    width?: number | string
    height?: number | string
    aspectRatio?: string
    objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
    placeholder?: 'skeleton' | 'icon'
    threshold?: number
    rootMargin?: string
    sizes?: string
    srcset?: string
    decoding?: 'async' | 'sync' | 'auto'
    eager?: boolean
    rounded?: boolean | string
}

interface Emits {
    (e: 'load' | 'error', event: Event): void
    (e: 'intersect', isIntersecting: boolean): void
}

const props = withDefaults(defineProps<Props>(), {
    alt: '',
    aspectRatio: '',
    objectFit: 'cover',
    placeholder: 'icon',
    threshold: 0.1,
    rootMargin: '50px',
    decoding: 'async',
    eager: false,
    rounded: false,
})

const emit = defineEmits<Emits>()

// Refs
const containerRef = ref<HTMLElement>()
const imageLoaded = ref(false)
const imageError = ref(false)
const isIntersecting = ref(false)
const observer = ref<IntersectionObserver>()

// Computed properties
const shouldLoadImage = computed(() => {
    return props.eager || isIntersecting.value
})

const loadingStrategy = computed(() => {
    return props.eager || isIntersecting.value ? 'eager' : 'lazy'
})

const showSkeleton = computed(() => {
    return props.placeholder === 'skeleton'
})

const containerClasses = computed(() => {
    const classes = []

    // Aspect ratio
    if (props.aspectRatio) {
        classes.push(`aspect-[${props.aspectRatio.replace('/', '/')}]`)
    }

    // Dimensions
    if (props.width) {
        classes.push(typeof props.width === 'number' ? `w-[${props.width}px]` : `w-${props.width}`)
    }

    if (props.height) {
        classes.push(typeof props.height === 'number' ? `h-[${props.height}px]` : `h-${props.height}`)
    }

    // Rounded corners
    if (props.rounded) {
        if (typeof props.rounded === 'boolean') {
            classes.push('rounded-lg')
        }
        else {
            classes.push(`rounded-${props.rounded}`)
        }
    }

    return classes.join(' ')
})

const imageClasses = computed(() => {
    const classes = []

    // Object fit
    const objectFitClasses = {
        'contain': 'object-contain',
        'cover': 'object-cover',
        'fill': 'object-fill',
        'none': 'object-none',
        'scale-down': 'object-scale-down',
    }

    classes.push(objectFitClasses[props.objectFit])

    return classes.join(' ')
})

// Methods
const handleImageLoad = (event: Event) => {
    imageLoaded.value = true
    imageError.value = false
    emit('load', event)
}

const handleImageError = (event: Event) => {
    imageError.value = true
    imageLoaded.value = false
    emit('error', event)
}

const setupIntersectionObserver = () => {
    if (!containerRef.value || props.eager) return

    observer.value = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                isIntersecting.value = entry.isIntersecting
                emit('intersect', entry.isIntersecting)

                // Once intersecting, we can disconnect the observer
                if (entry.isIntersecting) {
                    observer.value?.disconnect()
                }
            })
        },
        {
            threshold: props.threshold,
            rootMargin: props.rootMargin,
        },
    )

    observer.value.observe(containerRef.value)
}

const cleanup = () => {
    if (observer.value) {
        observer.value.disconnect()
        observer.value = undefined
    }
}

// Lifecycle
onMounted(() => {
    if (props.eager) {
        isIntersecting.value = true
    }
    else {
        setupIntersectionObserver()
    }
})

onUnmounted(() => {
    cleanup()
})

// Watch for src changes
watch(() => props.src, () => {
    imageLoaded.value = false
    imageError.value = false

    if (!props.eager && !isIntersecting.value) {
        setupIntersectionObserver()
    }
})

// Watch for eager prop changes
watch(() => props.eager, (newEager) => {
    if (newEager) {
        isIntersecting.value = true
        cleanup()
    }
    else if (!isIntersecting.value) {
        setupIntersectionObserver()
    }
})
</script>

<style scoped>
/* Custom aspect ratio utilities if needed */
.aspect-\[16\/9\] {
  aspect-ratio: 16/9;
}

.aspect-\[4\/3\] {
  aspect-ratio: 4/3;
}

.aspect-\[1\/1\] {
  aspect-ratio: 1/1;
}

.aspect-\[3\/2\] {
  aspect-ratio: 3/2;
}
</style>
