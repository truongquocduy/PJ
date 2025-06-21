<script setup>
import IconBrandTwitter from '@/assets/icons/brand-twitter.svg'
import IconBrandFacebook from '@/assets/icons/brand-facebook.svg'
import IconBrandInstagram from '@/assets/icons/brand-instagram.svg'
import IconBasketCheck from '@/assets/icons/basket-check.svg'
import IconSun from '@/assets/icons/sun.svg'

const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    size: {
        type: [String, Number],
        default: 'md',
    },
    viewBox: {
        type: String,
        default: '0 0 24 24',
    },
    class: {
        type: String,
        default: '',
    },
})

const iconRegistry = {
    'brand-twitter': IconBrandTwitter,
    'brand-facebook': IconBrandFacebook,
    'brand-instagram': IconBrandInstagram,
    'basket-check': IconBasketCheck,
    'sun': IconSun,
}

const sizeMap = {
    'xs': '12',
    'sm': '16',
    'md': '24',
    'lg': '32',
    'xl': '48',
    '2xl': '64',
    '3xl': '96',
}

const iconComponent = computed(() => {
    const component = iconRegistry[props.name]
    if (!component) {
        console.warn(`Icon "${props.name}" not found in registry`)
        return null
    }
    return component
})

const iconSize = computed(() => {
    if (typeof props.size === 'number') {
        return props.size.toString()
    }

    if (typeof props.size === 'string' && !isNaN(props.size)) {
        return props.size
    }

    return sizeMap[props.size] || sizeMap.md
})

const additionalClasses = computed(() => props.class)
</script>

<template>
    <component
        :is="iconComponent"
        v-if="iconComponent"
        :class="additionalClasses"
        :height="iconSize"
        :viewBox="viewBox"
        :width="iconSize"
    />
    <div
        v-else
        class="inline-block bg-gray-200 rounded"
        :style="`width: ${iconSize}px; height: ${iconSize}px;`"
    >
        <span class="text-xs text-gray-500">?</span>
    </div>
</template>
