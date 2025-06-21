<script lang="ts" setup>
import type { Menu } from '~/libs/api/blog/menu'

interface Props {
    item: Menu
    level?: number
}

const props = defineProps<Props>()

// Destructuring
const { item } = props
const { name, url } = item

const navRef = ref(null)
const { checkPosition } = useDropdownPosition()

const onMouseEnter = () => {
    if (navRef.value) {
        checkPosition(navRef.value)
    }
}
</script>

<template>
    <div
        ref="navRef"
        class="menu-item px-4 flex items-center"
        :class="props.level === 1 ? 'nav-item' : 'childs-item'"
        @mouseenter="onMouseEnter"
    >
        <NuxtLink
            class="w-full"
            :to="url"
        >
            <div
                class="menu-name"
            >
                {{ name }}

                <UIcon
                    v-if="props.level === 1 && item.children.length"
                    class="size-5"
                    name="i-tabler-chevron-down"
                />

                <UIcon
                    v-else-if="props.level !== 1 && item.children.length"
                    class="size-5 float-end"
                    name="i-tabler-chevron-right"
                />
            </div>
        </NuxtLink>

        <div
            v-if="item.children.length"
            class="childs"
        >
            <div>
                <WidgetMenuItem
                    v-for="child in item.children"
                    :key="child.id"
                    :item="child"
                    :level="2"
                />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.menu-item {
    cursor: pointer;
    position: relative;

    .menu-name {
        display: flex;
        justify-content: space-between;
        z-index: 1;
    }

    &.childs-item {

        width: 100%;
        height: 40px;
        cursor: pointer;
        padding: 0px 1rem;
        align-items: center;

        &:not(:last-child) {
            border-bottom: 1px solid var(--ui-border) !important;
        }

        &:hover {
            color: var(--ui-text);
            background: rgba(75, 86, 107, 0.04);
        }

        & > .childs {
            top: 2px;
            left: calc(100% + 10px);
            transform: translateY(-46px);

            &:before {
                position: absolute;
                top: 40px;
                left: -10px;
                right: -10px;
                bottom: 0;
                content: '';
            }
        }
    }

    & > .childs {
        display: none;
        position: absolute;
        top: 0;

        & > div {
            width: max-content;
            margin-top: 38px;
            min-width: 300px;
            background-color: var(--ui-bg);
            padding: 6px 0;
            border-radius: 8px;
            z-index: 10;
            border: 1px solid var(--ui-border) !important;
        }
    }

    &:hover > .childs {
        display: block;
    }
}
</style>
