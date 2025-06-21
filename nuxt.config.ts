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
        // inlineSSRStyles: false,
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

        build: {
            rollupOptions: {
                output: {
                    manualChunks: {
                        'vue-vendor': ['vue', '@vue/runtime-core'],
                        'pinia-vendor': ['pinia', '@pinia/nuxt'],
                        'utils': ['@vueuse/core', '@vueuse/nuxt'],
                    },
                },
            },
        },
        optimizeDeps: {
            include: ['lucide-vue-next'],
        },
    },

    // TypeScript optimization
    typescript: {
        strict: true,
        typeCheck: false, // Disable in development for faster builds
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
