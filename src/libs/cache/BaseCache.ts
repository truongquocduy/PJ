import CryptoJS from 'crypto-js'

export class BaseCache {
    private _prefix: string

    constructor(prefix: string) {
        this._prefix = prefix
    }

    createCacheKey(key: string, params: object) {
        return `${this._prefix}:` + CryptoJS.MD5(JSON.stringify({ key, params })).toString().slice(0, 7)
    }
}

export interface CacheInterface {
    createCacheKey(key: string, params: object): string
    set(key: string, value: any, ttl: number): Promise<void>
    get(key: string): Promise<any>
    clear(): Promise<void>
}
