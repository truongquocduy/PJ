import { persistentAtom } from '@nanostores/persistent'
import type { Variants } from '~/libs/api/shop/product'
import type { CartItem, Order, Province } from '~/types/master'

const persistentCart = persistentAtom<CartItem[]>('nexttop_cart', [], {
    decode: JSON.parse,
    encode: JSON.stringify,
})

export const useCartStore = defineStore('cart', () => {
    // States
    const carts = ref<CartItem[]>([])
    const provinces = ref<Province[]>([])
    const completeOrder = ref()

    // Getters
    const itemChecked = computed(() => carts.value.filter(item => item.checked))
    const costTotal = computed(() => itemChecked.value.reduce((total, item) => {
        return total + item.price
    }, 0))

    const quantityTotal = computed(() => itemChecked.value.reduce((total, item) => {
        return total + item.quantity
    }, 0))

    const priceTotal = computed(() => itemChecked.value.reduce((total, item) => {
        const itemTotal = item.price * item.quantity

        return total + itemTotal
    }, 0))

    // Actions
    const syncWithPersistentCart = () => {
        carts.value = persistentCart.get()
    }

    const addCartItem = (item: CartItem) => {
        const existingItem = carts.value.find(i => i.id === item.id)

        if (existingItem) {
            carts.value = carts.value.map(i => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
        }
        else {
            carts.value.push({ ...item, quantity: 1 })
        }

        persistentCart.set(carts.value)
    }

    const removeCartItem = (itemId: number) => {
        carts.value = carts.value.filter(i => i.id !== itemId)
        persistentCart.set(carts.value)
    }

    const clearCartItem = () => {
        carts.value = []
        persistentCart.set(carts.value)
    }

    const changeQuantityCartItem = (itemId: number, quantity: number) => {
        carts.value = carts.value.map(i => (i.id === itemId ? { ...i, quantity } : i))
        persistentCart.set(carts.value)
    }

    const toggleChecked = (itemId: number, checked: boolean) => {
        carts.value = carts.value.map(i => (i.id === itemId ? { ...i, checked } : i))
        persistentCart.set(carts.value)
    }

    const toggleCheckedAll = (checked: boolean) => {
        carts.value = carts.value.map(i => ({ ...i, checked }))
        persistentCart.set(carts.value)
    }

    const supQuatityCartItem = (itemId: number, quantity: number) => {
        if (quantity <= 0) {
            return removeCartItem(itemId)
        }

        changeQuantityCartItem(itemId, quantity)
    }

    const changeVariantCartItem = (itemId: number, variant: Variants) => {
        const data: { price: number, thumbnail?: string, variant_id: number } = {
            price: variant.sale_price,
            variant_id: variant.id,
        }

        if (variant.image) {
            data.thumbnail = variant.image
        }

        carts.value = carts.value.map(i => (i.id === itemId ? { ...i, ...data } : i))
        persistentCart.set(carts.value)
    }

    const provinceApi = async () => {
        const response = await $fetch<Province[]>('/api/provinces')
        provinces.value = response || []
    }

    const postCheckout = async (data: object) => {
        const response = await $fetch<Order>('/api/checkout', { method: 'POST', body: data })
        completeOrder.value = response
        clearCartItem()
    }

    return {
        carts,
        provinces,
        completeOrder,
        itemChecked,
        quantityTotal,
        costTotal,
        priceTotal,

        syncWithPersistentCart,
        toggleChecked,
        toggleCheckedAll,
        addCartItem,
        removeCartItem,
        clearCartItem,
        changeQuantityCartItem,
        supQuatityCartItem,
        changeVariantCartItem,
        provinceApi,
        postCheckout,
    }
})
