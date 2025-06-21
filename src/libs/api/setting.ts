import { ApiMain } from '~/libs/classes/ApiMain'

const API_PATH = 'settings'

export interface Setting {
    [key: string]: unknown
    'general.app_name': string
    'general.app_active': boolean
    'general.app_debug': boolean
    'general.seo_title': unknown
    'general.seo_description': unknown
    'general.seo_keywords': unknown
    'general.post_limit_per_page': string
    'general.display_recommended_posts': boolean
    'general.seo_robots': string
    'general.redirects'?: Redirect[]
    'general.cdn_url'?: URL
    'general.google_schema_founding_date'?: string
    'general.google_schema_legal_name'?: string
    'general.google_schema_number_of_employees'?: string
    'general.google_tag_id'?: string
    'general.display_related_posts'?: boolean
    'general.recommended_post_limit_per_page'?: string
    'general.social_facebook'?: string
    'general.social_instagram'?: string
    'general.social_x'?: string
    'general.social_youtube'?: string
    'general.social_tiktok'?: string
    'general.social_pinterest'?: string
    'general.google_ads_id'?: string
    'general.openai_key'?: string
    'general.anthropic_key'?: string
    'general.ai_writing_system_prompt'?: string
    'shop.currency': string
    'app_info': {
        app_url: string
        logo: string
        favicon: string
        language: string
    }
}

interface Redirect {
    from_url: string
    to_url: string
    status_code: number
}

export async function apiSetting(): Promise<Setting> {
    return await ApiMain.getInstance().callApi(API_PATH) as Setting
}
