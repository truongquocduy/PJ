import type { IncomingHttpHeaders } from 'http'
import type { H3Event } from 'h3'
import { APP_DEFAULT_LANGUAGE } from '../constants'

export class ConfigAdapter {
    private static instance: ConfigAdapter
    private readonly _api_url: string = process.env.API_URL || ''
    private event: H3Event | null = null

    private constructor() {}

    public static getInstance(): ConfigAdapter {
        if (!ConfigAdapter.instance) {
            ConfigAdapter.instance = new ConfigAdapter()
        }

        return ConfigAdapter.instance
    }

    public setEvent(event: H3Event): ConfigAdapter {
        this.event = event
        return this
    }

    get headers(): IncomingHttpHeaders | null {
        if (!this.event) return null
        return this.event.node.req.headers
    }

    get api_url(): string {
        return this._api_url
    }

    get api_domain(): string | null {
        return 'mavangthangloi.com'
        // if (!this.headers) return null
        // const forwardedHost = this.headers['x-forwarded-host']
        // const host = this.headers.host
        // return (typeof forwardedHost === 'string' ? forwardedHost : null) || (typeof host === 'string' ? host : null) || null
    }

    get api_language(): string {
        if (!this.headers) return APP_DEFAULT_LANGUAGE
        const cookieHeader = this.headers.cookie

        if (typeof cookieHeader !== 'string') return APP_DEFAULT_LANGUAGE

        const cookies = cookieHeader.split(';')

        const languageCookie = cookies.find((cookie: string) => cookie.trim().startsWith('language='))

        if (!languageCookie) return APP_DEFAULT_LANGUAGE

        const [_key, value] = languageCookie.split('=')
        return value || APP_DEFAULT_LANGUAGE
    }

    get app_url(): URL | null {
        const domain = this.api_domain
        if (!domain) return null

        let url = domain
        if (!/^https?:\/\//i.test(url)) {
            url = 'https://' + url
        }

        try {
            return new URL(url)
        }
        catch {
            return null
        }
    }

    get image_url(): URL | null {
        const appUrl = this.app_url
        if (!appUrl) return null

        const { protocol, host } = appUrl
        try {
            return new URL(`${protocol}//image.${host}`)
        }
        catch {
            return null
        }
    }

    get image_domain(): string | null {
        return `image.${this.api_domain}`
    }
}
