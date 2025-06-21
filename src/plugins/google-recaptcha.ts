import { VueReCaptcha } from 'vue-recaptcha-v3'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueReCaptcha, {
        siteKey: '6LfZnQcrAAAAACJyaSEbgUeCvDBqIx90MA3ELLi5',
        loaderOptions: {},
    })
})
