export const useHelper = () => {
    const cdnImage = (url: string, { s = '_md' }: { s?: string } = {}): string => {
        if (!url) return ''

        let pathname = url

        // Parse URL only if it's a valid full URL
        try {
            pathname = new URL(url).pathname
        }
        catch {
            // If error occurs, we assume url is a relative path
        }

        // Normalize path and add size prefix
        pathname = `/${s}${pathname}`.replace(/\/{2,}/g, '/')

        // Return the final CDN URL
        // return `//image.${useRequestURL().host}${pathname}`
        return `//image.mavangthangloi.com${pathname}`
    }

    const numberFormat = (number: number | string | undefined, options: Intl.NumberFormatOptions = {}): string => {
        const defaultOptions = {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
            locale: 'vi-VN',
        }

        const mergedOptions = { ...defaultOptions, ...options }

        if (typeof number === 'string') {
            number = parseFloat(number)
        }

        if (typeof number === 'undefined' || isNaN(number)) {
            return ''
        }

        return new Intl.NumberFormat(mergedOptions.locale).format(number)
    }

    const replaceHTMLContent = (html: string, { s = '_xl' } = {}): string => {
        const regex = /<img[^>]+src="([^">]+)"/g

        for (const [_el_image, url_image] of html.matchAll(regex)) {
            html = html.replace(url_image, cdnImage(url_image, { s }))
        }

        return html
    }

    return {
        cdnImage,
        numberFormat,
        replaceHTMLContent,
    }
}
