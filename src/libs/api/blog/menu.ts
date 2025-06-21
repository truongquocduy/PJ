import { ApiMain } from '~/libs/classes/ApiMain'

const API_PATH = 'menu'

export interface Menu {
    id: number
    params: Params
    name: string
    url: string
    children: Children[]
}

export interface Children {
    id: number
    params: Params
    name: string
    url: string
    children: Menu[]
}

export interface Params {
    target: string
}

export async function apiMenu(): Promise<Menu[]> {
    return await ApiMain.getInstance().callApi(API_PATH) as Menu[]
}
