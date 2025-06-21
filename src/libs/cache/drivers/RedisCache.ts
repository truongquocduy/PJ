import Redis from 'ioredis'

import { BaseCache, type CacheInterface } from '../BaseCache'

const { REDIS_PORT, REDIS_HOST, REDIS_PASS } = process.env

export class RedisCache extends BaseCache implements CacheInterface {
    private client: Redis
    private prefix: string

    constructor(prefix: string) {
        super(prefix)

        this.prefix = prefix
        this.client = new Redis({
            port: parseInt(REDIS_PORT || '6379'),
            host: REDIS_HOST,
            password: REDIS_PASS,
        })
    }

    public set(key: string, value: unknown, ttl: number = 3600 * 0.5): Promise<void> {
        return new Promise((resolve, reject) => {
            const stringValue = typeof value === 'string' ? value : JSON.stringify(value)

            if (ttl) {
                this.client.set(key, stringValue, 'EX', ttl, (err) => {
                    if (err) {
                        reject(err)
                    }
                    else {
                        resolve()
                    }
                })
            }
            else {
                this.client.set(key, stringValue, (err) => {
                    if (err) {
                        reject(err)
                    }
                    else {
                        resolve()
                    }
                })
            }
        })
    }

    public get(key: string): Promise<unknown> {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, result) => {
                if (err) {
                    reject(err)
                }
                else {
                    try {
                        resolve(JSON.parse(String(result)))
                    }
                    catch {
                        resolve(result)
                    }
                }
            })
        })
    }

    public async clear() {
        const keys = await this.client.keys(`${this.prefix}*`)

        if (keys.length === 0) {
            return
        }

        const pipeline = this.client.pipeline()
        keys.forEach((key) => {
            pipeline.del(key)
        })

        await pipeline.exec()
    }
}
