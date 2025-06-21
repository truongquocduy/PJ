import tailwindcss from '@tailwindcss/vite'
import svgLoader from 'vite-svg-loader'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

    modules: ['@nuxt/eslint', '@nuxtjs/google-fonts', '@nuxtjs/i18n', '@pinia/nuxt'],
    ssr: true,
    devtools: { enabled: false },

    css: [
        '~/assets/css/main.css',
        '~/assets/css/variables.css',
    ],

    srcDir: 'src/',

    compatibilityDate: '2025-05-15',

    vite: {
        plugins: [
            tailwindcss(),
            svgLoader(),
        ],

        css: {
            devSourcemap: false,
        },
    },

    eslint: {
        config: {
            stylistic: {
                indent: 4,
                semi: false,
            },
        },
    },

    googleFonts: {
        families: {
            'Public+Sans': true,
        },
        display: 'swap',
        preconnect: true,
    },

    i18n: {
        vueI18n: '../i18n.config.ts',
        bundle: {
            optimizeTranslationDirective: false,
        },
    },
})
