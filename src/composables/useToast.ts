import { v4 as uuidv4 } from 'uuid'
import { ref, computed } from 'vue'

export interface Toast {
    id: string
    title?: string
    message: string
    type: 'success' | 'error' | 'warning' | 'info'
    duration?: number
    persistent?: boolean
    actions?: readonly ToastAction[]
}

export interface ToastAction {
    readonly label: string
    readonly action: () => void
    readonly style?: 'primary' | 'secondary'
}

export interface ToastOptions {
    title?: string
    duration?: number
    persistent?: boolean
    actions?: readonly ToastAction[]
}

const toasts = ref<Toast[]>([])

export function useToast() {
    const addToast = (toast: Toast) => {
        toasts.value.push(toast)

        if (!toast.persistent) {
            setTimeout(() => {
                removeToast(toast.id)
            }, toast.duration || 3000)
        }
    }

    const removeToast = (id: string) => {
        const index = toasts.value.findIndex(toast => toast.id === id)
        if (index > -1) {
            toasts.value.splice(index, 1)
        }
    }

    const clearToasts = () => {
        toasts.value.splice(0, toasts.value.length)
    }

    const createToast = (message: string, type: Toast['type'], options: ToastOptions = {}) => {
        const toast: Toast = {
            id: uuidv4(),
            message,
            type,
            ...options,
        }
        addToast(toast)
    }

    const success = (message: string, options: ToastOptions = {}) => {
        createToast(message, 'success', options)
    }

    const error = (message: string, options: ToastOptions = {}) => {
        createToast(message, 'error', options)
    }

    const warning = (message: string, options: ToastOptions = {}) => {
        createToast(message, 'warning', options)
    }

    const info = (message: string, options: ToastOptions = {}) => {
        createToast(message, 'info', options)
    }

    const promise = async <T>(
        promise: Promise<T>,
        messages: {
            pending: string
            success: string
            error: string
        },
        options: ToastOptions = {},
    ): Promise<T> => {
        const id = uuidv4()
        const toast: Toast = {
            id,
            message: messages.pending,
            type: 'info',
            persistent: true,
            ...options,
        }
        addToast(toast)

        try {
            const result = await promise
            removeToast(id)
            success(messages.success, options)
            return result
        }
        catch (e: unknown) {
            removeToast(id)
            error(messages.error, options)
            throw e
        }
    }

    return {
        toasts: computed(() => toasts.value),
        addToast,
        removeToast,
        clearToasts,
        success,
        error,
        warning,
        info,
        promise,
    }
}
