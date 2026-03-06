import { createContext, useContext, useMemo, useState } from 'react'

const UIContext = createContext(null)

export function UIProvider({ children }) {
    const [isCartOpen, setIsCartOpen] = useState(false)

    function openCart() {
        setIsCartOpen(true)
    }

    function closeCart() {
        setIsCartOpen(false)
    }

    function toggleCart() {
        setIsCartOpen((prev) => !prev)
    }

    const value = useMemo(
        () => ({
            isCartOpen,
            openCart,
            closeCart,
            toggleCart,
        }),
        [isCartOpen]
    )

    return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}

export function useUI() {
    const context = useContext(UIContext)

    if (!context) {
        throw new Error('useUI precisa ser usado dentro de UIProvider')
    }

    return context
}