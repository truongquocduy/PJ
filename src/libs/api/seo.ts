import { ApiMain } from '../classes/ApiMain'

export interface Meta {
    seo_title: string
    seo_keywords: string
    seo_description: string
    seo_image: string
    google_schema?: object
}

export async function xmlSitemap(language: string, type: string): Promise<unknown> {
    return await ApiMain.getInstance().callXml(`sitemap/${language}/${type}.xml`)
}

export async function xmlSitemapLLMS(): Promise<string> {
    return await ApiMain.getInstance().callXml(`sitemap/vi/llms.txt`) as string
}

export async function xmlRss(language: string, categoy: string): Promise<unknown> {
    return await ApiMain.getInstance().callXml(`rss/${language}/${categoy}.rss`)
}
