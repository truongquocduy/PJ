import type { Product } from '~/libs/api/shop/product'

export interface CartState {
    cartItems: CartItem[]
    provinces: Province[]
    completeOrder: Order | null
}

export type CartItem = Pick<Product, 'id' | 'name' | 'thumbnail' | 'price' | 'slug'> & { checked: boolean, quantity: number, variant_id: number }

// types.ts
export interface Province {
    Code: string
    FullName: string
    District: District[]
}

export interface District {
    Code: string
    FullName: string
    Ward: Ward[]
}

export interface Ward {
    Code: string
    FullName: string
}

export interface Order {
    order_id: string
    email: string
    billing_address: unknown
    shipping_address: unknown
    currency: string
    notes: string
    subtotal: number
    total: number
    created_at: string
    updated_at: string
    products: { quantity: number, price: number, sku: string, name: string }[]
}

export interface LicenseAnswer {
    id: number
    text: string
    correct: boolean
}

export interface LicenseQuestion {
    image: string
    no: number
    index: number
    text: string
    tip: string
    answers: LicenseAnswer[]
    topic: number
    required: number
    a1: number
    a2: number
    a34: number
    b1: number
    b2: number
    c: number
    def: number
}
