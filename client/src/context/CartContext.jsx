import { createContext, useCallback, useEffect, useMemo, useState } from 'react'

export const CartContext = createContext(null)

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        try {
            const savedCart = localStorage.getItem('nike-store-cart')
            if (savedCart) {
                const parsed = JSON.parse(savedCart)
                if (Array.isArray(parsed)) {
                    setCartItems(parsed)
                }
            }
        } catch (error) {
            console.error('Erro ao carregar carrinho:', error)
        }
    }, [])

    useEffect(() => {
        try {
            localStorage.setItem('nike-store-cart', JSON.stringify(cartItems))
        } catch (error) {
            console.error('Erro ao salvar carrinho:', error)
        }
    }, [cartItems])

    const addToCart = useCallback((product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id)

            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }

            return [...prevItems, { ...product, quantity: 1 }]
        })
    }, [])

    const increaseQuantity = useCallback((productId) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        )
    }, [])

    const decreaseQuantity = useCallback((productId) => {
        setCartItems((prevItems) =>
            prevItems
                .map((item) =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        )
    }, [])

    const removeFromCart = useCallback((productId) => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => item.id !== productId)
        )
    }, [])

    const clearCart = useCallback(() => {
        setCartItems([])
    }, [])

    const cartCount = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.quantity, 0)
    }, [cartItems])

    const cartTotal = useMemo(() => {
        return cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        )
    }, [cartItems])

    const value = {
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartTotal,
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}