<script lang="ts" setup>
interface Props {
    data: string
    visibility?: {
        styling: {
            heading: string
        }

        request_path: {
            pages: string[] | null
            negate: boolean
        }
    }
}

const props = defineProps<Props>()

// Hooks
const { replaceHTMLContent } = useHelper()

// Computed
const processedContent = computed(() => {
    return replaceHTMLContent(props.data)
})
</script>

<template>
    <div>
        <h4
            v-if="visibility?.styling.heading"
            class="font-semibold mb-2 py-2"
        >
            {{ visibility?.styling.heading }}
        </h4>

        <div
            class="prose max-w-full my-4"
            v-html="processedContent"
        />
    </div>
</template>
