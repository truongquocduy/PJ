<template>
    <component
        :is="component"
        v-if="component"
        :data="value"
        :name="name"
        :visibility="visibility"
    />
</template>

<script lang="ts" setup>
const Html = resolveComponent('UiWidgetHtml')
const Menu = resolveComponent('UiWidgetMenu')
const Posts = resolveComponent('UiWidgetPosts')
const Products = resolveComponent('UiWidgetProducts')

interface Props {
    name: string
    data: {
        menu?: unknown
        html?: unknown
        posts?: unknown
        products?: unknown
        category_ids?: unknown
    }
    visibility: unknown
}

const props = defineProps<Props>()

interface TemplateResult {
    value: unknown
    component: typeof Html | typeof Menu | typeof Posts | typeof Products | null
}

function resolveWidgetTemplate(data: Props['data']): TemplateResult {
    if (data?.menu) {
        return {
            value: data.menu,
            component: Menu,
        }
    }

    if (data?.html) {
        return {
            value: data.html,
            component: Html,
        }
    }

    if (data?.posts) {
        return {
            value: data.posts,
            component: Posts,
        }
    }

    if (data?.products) {
        return {
            value: {
                products: data.products,
                categoryIds: data.category_ids,
            },
            component: Products,
        }
    }

    return {
        value: null,
        component: null,
    }
}

const { value, component } = resolveWidgetTemplate(props.data)
</script>
