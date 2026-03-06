import { createContext, useCallback, useMemo, useState } from 'react'
import ToastHost from '../components/ToastHost/ToastHost'

export const ToastContext = createContext(null)

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([])

    const showToast = useCallback(
        ({ title, message = '', type = 'default', duration = 2500 }) => {
            const id = crypto.randomUUID
                ? crypto.randomUUID()
                : `${Date.now()}-${Math.random()}`

            const newToast = { id, title, message, type }

            setToasts((prev) => [...prev, newToast])

            window.setTimeout(() => {
                setToasts((prev) => prev.filter((toast) => toast.id !== id))
            }, duration)
        },
        []
    )

    const value = useMemo(() => ({ showToast }), [showToast])

    return (
        <ToastContext.Provider value={value}>
            {children}
            <ToastHost toasts={toasts} />
        </ToastContext.Provider>
    )
}