import tailwindcss from '@tailwindcss/vite'
import svgLoader from 'vite-svg-loader'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxt/eslint',
        '@nuxtjs/google-fonts',
        '@nuxtjs/i18n',
        '@pinia/nuxt',
        '@vueuse/nuxt',
    ],

    ssr: true,
    devtools: { enabled: false },

    css: [
        '~/assets/css/main.css',
        '~/assets/css/variables.css',
    ],

    srcDir: 'src/',

    // Build optimization
    build: {
        transpile: ['lucide-vue-next'],
    },

    routeRules: {
        '/': { prerender: true },
        '/api/**': { cors: true, headers: { 'cache-control': 's-maxage=60' } },
    },

    // Enable experimental features for better performance
    experimental: {
        payloadExtraction: false,
        renderJsonPayloads: true,
        typedPages: true,
    },

    compatibilityDate: '2025-05-15',

    // Optimize build
    nitro: {
        compressPublicAssets: true,
        minify: true,
        prerender: {
            crawlLinks: false,
            routes: ['/'],
        },
    },

    vite: {
        plugins: [
            tailwindcss(),
            svgLoader(),
        ],

        css: {
            devSourcemap: false,
        },

        // Simplified build config - loại bỏ manualChunks gây conflict
        build: {
            rollupOptions: {
                external: ['@nuxt/kit'], // Exclude @nuxt/kit from bundling
            },
        },

        optimizeDeps: {
            include: ['lucide-vue-next'],
            exclude: ['@nuxt/kit'], // Exclude from optimization
        },
    },

    // TypeScript optimization
    typescript: {
        strict: true,
        typeCheck: false,
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
