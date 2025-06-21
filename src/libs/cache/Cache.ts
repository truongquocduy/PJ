import type { CacheInterface } from './BaseCache'
import { RedisCache } from './drivers/RedisCache'

type CacheDriver = RedisCache

export class Cache implements CacheInterface {
    protected cacheDriver: CacheDriver

    constructor(prefix: string) {
        this.cacheDriver = new RedisCache(prefix)
    }

    createCacheKey(key: string, params: object): string {
        return this.cacheDriver.createCacheKey(key, params)
    }

    get(key: string): Promise<any> {
        return this.cacheDriver.get(key)
    }

    set(key: string, value: any, ttl: number = 3600 * 0.5): Promise<void> {
        return this.cacheDriver.set(key, value, ttl)
    }

    clear(): Promise<void> {
        return this.cacheDriver.clear()
    }
}
