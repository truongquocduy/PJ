import { RedisCache } from '../cache/drivers/RedisCache'
import { ConfigAdapter } from './ConfigAdapter'

const appendUrlParams = (url: URL, params: object) => {
    Object.keys(params).forEach((key) => {
        url.searchParams.append(key, params[key as keyof object])
    })
}

async function fetchData(url: URL, params: object, options: RequestInit) {
    appendUrlParams(url, params)

    // console.log('Generated cURL:', buildCurlCommand(url, options))

    const response = await fetch(url, options)

    if (!response.ok) {
        console.log(response.status, url.toString())
    }

    return response
}

// const buildCurlCommand = (url: URL, options: RequestInit) => {
//     let curl = `curl -X ${options.method || 'GET'} '${url.toString()}'`

//     if (options.headers) {
//         Object.entries(options.headers).forEach(([key, value]) => {
//             curl += ` -H '${key}: ${value}'`
//         })
//     }

//     if (options.body) {
//         curl += ` -d '${options.body}'`
//     }

//     return curl
// }

export class ApiMain {
    private _config: ConfigAdapter
    private _cache: RedisCache
    private _options: object

    private constructor() {
        this._config = ConfigAdapter.getInstance()
        this._cache = new RedisCache(this._config.api_domain!)
        this._options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Referer': this._config.api_domain,
                'Content-Type': 'application/json',
                'Accept-Language': this._config.api_language,
            },
        }
    }

    public static getInstance() {
        return new ApiMain()
    }

    async callApi(path: string, params = {}, cache = true) {
        const { api_url } = this._config
        const url = new URL(path, `${api_url}/api/`)
        const key = this._cache.createCacheKey(path, params)

        // Try getting from cache first
        let data = await this._cache.get(key)

        if (!cache || !data) {
            // If there's no cached data, fetch it and update the cache
            try {
                const response = await fetchData(url, params, this._options)
                const json = (await response.json()) || {}
                data = json?.data

                await this._cache.set(key, data)
            }
            catch (error) {
                console.log(error)
            }
        }

        return data
    }

    async postApi(path: string, body = {}) {
        const { api_url } = this._config
        const url = new URL(path, `${api_url}/api/`)

        try {
            const options = {
                ...this._options,
                method: 'POST',
                body: JSON.stringify(body),
            }

            const response = await fetchData(url, {}, options)
            const json = (await response.json()) || {}
            return json?.data
        }
        catch (error) {
            console.log(error)
            return null
        }
    }

    async callXml(path: string, params = {}) {
        const { api_url } = this._config
        const url = new URL(path, `${api_url}/`)
        const key = this._cache.createCacheKey(path, params)

        // Try getting from cache first
        let data = await this._cache.get(key)
        if (!data) {
            // If there's no cached data, fetch it and update the cache
            const response = await fetchData(url, params, this._options)
            data = await response.text()

            await this._cache.set(key, data)
        }

        return data
    }
}
