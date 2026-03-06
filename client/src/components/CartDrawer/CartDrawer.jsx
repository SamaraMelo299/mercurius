import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FiMinus, FiPlus, FiShoppingBag, FiX } from 'react-icons/fi'
import { useCart } from '../../hooks/useCart'
import { useUI } from '../../context/UIContext'
import formatPrice from '../../utils/formatPrice'
import './CartDrawer.css'

function CartDrawer() {
    const { isCartOpen, closeCart } = useUI()
    const {
        cartItems,
        cartTotal,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
    } = useCart()

    const closeBtnRef = useRef(null)

    useEffect(() => {
        if (!isCartOpen) return

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        window.setTimeout(() => closeBtnRef.current?.focus(), 0)

        function handleKeyDown(e) {
            if (e.key === 'Escape') closeCart()
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            document.body.style.overflow = previousOverflow
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [isCartOpen, closeCart])

    return (
        <>
            <div
                className={`tech-cart-drawer__overlay ${isCartOpen ? 'is-open' : ''}`}
                onClick={closeCart}
            />

            <aside
                className={`tech-cart-drawer ${isCartOpen ? 'is-open' : ''}`}
                role="dialog"
                aria-modal="true"
                aria-label="Carrinho"
            >
                <div className="tech-cart-drawer__header">
                    <div className="tech-cart-drawer__title">
                        <FiShoppingBag />
                        <strong>Carrinho</strong>
                    </div>

                    <button
                        ref={closeBtnRef}
                        type="button"
                        className="tech-cart-drawer__close"
                        onClick={closeCart}
                        aria-label="Fechar carrinho"
                    >
                        <FiX />
                    </button>
                </div>

                <div className="tech-cart-drawer__content">
                    {cartItems.length === 0 ? (
                        <div className="tech-cart-drawer__empty">
                            <p>Seu carrinho está vazio.
                                Adicione produtos e monte seu setup com a Mercurius.</p>

                            <Link
                                to="/products"
                                className="btn btn-primary"
                                onClick={closeCart}
                            >
                                Explorar produtos
                            </Link>
                        </div>
                    ) : (
                        <div className="tech-cart-drawer__list">
                            {cartItems.map((item) => (
                                <article key={item.id} className="tech-cart-item">
                                    <img
                                        className="tech-cart-item__img"
                                        src={item.image}
                                        alt={item.name}
                                    />

                                    <div className="tech-cart-item__info">
                                        <div className="tech-cart-item__top">
                                            <strong className="tech-cart-item__name">
                                                {item.name}
                                            </strong>

                                            <strong className="tech-cart-item__total">
                                                {formatPrice(item.price * item.quantity)}
                                            </strong>
                                        </div>

                                        <span className="tech-cart-item__meta">
                                            {item.quantity}x • {formatPrice(item.price)}
                                        </span>

                                        <div className="tech-cart-item__actions">
                                            <div className="tech-cart-qty">
                                                <button
                                                    type="button"
                                                    onClick={() => decreaseQuantity(item.id)}
                                                    aria-label="Diminuir quantidade"
                                                >
                                                    <FiMinus />
                                                </button>

                                                <span>{item.quantity}</span>

                                                <button
                                                    type="button"
                                                    onClick={() => increaseQuantity(item.id)}
                                                    aria-label="Aumentar quantidade"
                                                >
                                                    <FiPlus />
                                                </button>
                                            </div>

                                            <button
                                                type="button"
                                                className="tech-cart-item__remove"
                                                onClick={() => removeFromCart(item.id)}
                                            >
                                                Remover
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>

                <div className="tech-cart-drawer__footer">
                    <div className="tech-cart-drawer__subtotal">
                        <span>Subtotal</span>
                        <strong>{formatPrice(cartTotal)}</strong>
                    </div>

                    <div className="tech-cart-drawer__buttons">
                        <Link to="/cart" className="btn btn-secondary" onClick={closeCart}>
                            Ver carrinho
                        </Link>

                        <Link to="/checkout" className="btn btn-primary" onClick={closeCart}>
                            Finalizar compra
                        </Link>
                    </div>

                    <p className="tech-cart-drawer__hint">
                        Revise seus itens antes de seguir para a finalização da compra.
                    </p>
                </div>
            </aside>
        </>
    )
}

export default CartDrawer