import { ApiMain } from '~/libs/classes/ApiMain'

const API_PATH = 'shop/orders'

type Address = {
    name: string
    phone: string
    province: string
    district: string
    ward: string
    address: string
}

type Variant = {
    variant_id: number
    quantity: number
}

type Order = {
    billing_address: Address
    shipping_address: Address | null
    email: string
    variants: Variant[]
}

export async function apiCheckout(body: Order): Promise<boolean> {
    return (await ApiMain.getInstance().postApi(`${API_PATH}/create`, body)) || {}
}
