<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import type { Menu } from '~/libs/api/blog/menu'
import { useMasterStore } from '~/store/master'

interface Props {
    data: Menu[]
}

// Props
const props = defineProps<Props>()

// Composables
const useMaster = useMasterStore()
const { openMenu } = storeToRefs(useMaster)

// Computed
const menuFormat = computed(() => props.data.map((menu) => {
    const result: NavigationMenuItem = [{
        label: menu.name,
        to: menu.url,
        children: [],
        onClick: () => openMenu.value = false,
    }]

    if (menu.children && menu.children.length > 0) {
        result[0].children?.push({
            label: menu.name,
            to: menu.url,
            children: [],
            onClick: () => openMenu.value = false,
        })

        menu.children.forEach((child) => {
            result[0].children?.push({
                label: child.name,
                to: child.url,
                children: [],
                onClick: () => openMenu.value = false,
            })
        })
    }

    return result
}))
</script>

<template>
    <div>
        <!-- PC -->
        <div class="hidden md:block">
            <div class="navbar-nav">
                <UiWidgetMenuItem
                    v-for="item in data"
                    :key="item.id"
                    :item="item"
                    :level="1"
                />
            </div>
        </div>

        <!-- SP -->
        <div class="md:hidden">
            <ClientOnly>
                <UNavigationMenu
                    :items="menuFormat"
                    orientation="vertical"
                    :ui="{
                        childList: 'border-0 -ml-1 py-2',
                        list: 'border border-(--ui-border) rounded p-2',
                        childItem: 'border-y border-(--ui-border) mb-2 py-2',
                    }"
                />
            </ClientOnly>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.navbar-nav {
    display: flex;
    flex-direction: column;
    list-style: none;
    margin-bottom: 0;
    padding-left: 0;

    @media (min-width: 768px) {
        flex-direction: row;
    }
}
</style>
