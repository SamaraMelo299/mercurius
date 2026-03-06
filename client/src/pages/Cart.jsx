import { Link } from 'react-router-dom'
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi'
import { useCart } from '../hooks/useCart'
import formatPrice from '../utils/formatPrice'
import './Cart.css'

function Cart() {
    const {
        cartItems,
        cartTotal,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
    } = useCart()

    if (cartItems.length === 0) {
        return (
            <section className="cart-page-shell">
                <div className="container">
                    <div className="cart-empty card">
                        <h1 className="section-title">Seu carrinho está vazio</h1>
                        <p className="section-subtitle">
                            Adicione produtos ao carrinho para continuar sua experiência de compra.
                        </p>

                        <div className="cart-empty__actions">
                            <Link to="/products" className="btn btn-primary">
                                Ver produtos
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="cart-page-shell">
            <div className="container">
                <div className="cart-page">
                    <div className="cart-page__items">
                        <div className="cart-page__header">
                            <div>
                                <span className="badge">Carrinho</span>
                                <h1 className="section-title cart-page__title">
                                    Itens selecionados
                                </h1>
                            </div>

                            <button
                                className="btn btn-secondary"
                                onClick={clearCart}
                                type="button"
                            >
                                Limpar carrinho
                            </button>
                        </div>

                        <div className="cart-list">
                            {cartItems.map((item) => (
                                <article key={item.id} className="cart-item card">
                                    <div className="cart-item__image">
                                        <img src={item.image} alt={item.name} />
                                    </div>

                                    <div className="cart-item__content">
                                        <div className="cart-item__top">
                                            <div>
                                                <span className="cart-item__category">
                                                    {item.category}
                                                </span>
                                                <h3>{item.name}</h3>
                                            </div>

                                            <button
                                                className="cart-item__remove"
                                                onClick={() => removeFromCart(item.id)}
                                                aria-label={`Remover ${item.name}`}
                                                type="button"
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </div>

                                        <div className="cart-item__bottom">
                                            <div className="cart-item__quantity">
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

                                            <strong>
                                                {formatPrice(item.price * item.quantity)}
                                            </strong>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>

                    <aside className="cart-summary card">
                        <h2>Resumo do pedido</h2>

                        <div className="cart-summary__row">
                            <span>Itens</span>
                            <span>{cartItems.length}</span>
                        </div>

                        <div className="cart-summary__row">
                            <span>Total</span>
                            <strong>{formatPrice(cartTotal)}</strong>
                        </div>

                        <div className="cart-summary__actions">
                            <Link to="/checkout" className="btn btn-primary">
                                Ir para checkout
                            </Link>

                            <Link to="/products" className="btn btn-secondary">
                                Continuar comprando
                            </Link>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    )
}

export default Cart