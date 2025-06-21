<script setup lang="ts">
import { WIDGET_AFTER_INNER_CONTENT, WIDGET_BEFORE_INNER_CONTENT } from '~/libs/constants'
</script>

<template>
    <UiContainer>
        <UiWidget :group="WIDGET_BEFORE_INNER_CONTENT" />
        <UiWidget :group="WIDGET_AFTER_INNER_CONTENT" />
    </UiContainer>
</template>
