import { ConfigAdapter } from './classes/ConfigAdapter'

export function getRoute(path: string = '/'): string | URL {
    const domain = ConfigAdapter.getInstance().app_url

    try {
        return new URL(path, domain!)
    }
    catch {
        return domain!
    }
}

export function nl2br(text: string): string {
    return text ? text.replace(/[\r]/g, '').replace(/[\n]/g, '<br>') : ''
}

export function getPathFromUrl(url: string): string | null {
    // eslint-disable-next-line no-useless-escape
    const pattern = /^(?:https?:\/\/)?(?:www\.)?[^\/]+(\/[^?#]*)?/
    const match = url.match(pattern)

    if (match) {
        return match[1] ? match[1] : '/'
    }

    return null
}
