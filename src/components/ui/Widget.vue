<script setup lang="ts">
interface Props {
    group: string
    attributes?: Record<string, unknown>
}

const props = defineProps<Props>()

const { data } = await useFetch(`/api/widget/${props.group}`)

const widgets = data.value
</script>

<template>
    <div
        v-if="widgets?.length"
        v-bind="attributes"
    >
        <UiWidgetItem
            v-for="widget in widgets"
            :key="widget.name"
            :data="widget.data"
            :name="widget.name"
            :visibility="widget.visibility"
        />
    </div>
</template>
