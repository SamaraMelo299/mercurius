import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiLock } from 'react-icons/fi'
import { useCart } from '../hooks/useCart'
import formatPrice from '../utils/formatPrice'
import './Checkout.css'

function Checkout() {
    const navigate = useNavigate()
    const { cartItems, cartTotal } = useCart()

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        zip: '',
        address: '',
        city: '',
        state: '',
        payment: 'card',
    })

    const shipping = useMemo(() => {
        if (cartTotal >= 800) return 0
        return cartItems.length > 0 ? 29.9 : 0
    }, [cartItems.length, cartTotal])

    const total = useMemo(() => cartTotal + shipping, [cartTotal, shipping])

    function handleChange(e) {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    function handleSubmit(e) {
        e.preventDefault()

        if (!form.name || !form.email || !form.zip || !form.address) {
            alert('Preencha nome, e-mail, CEP e endereço.')
            return
        }

        if (cartItems.length === 0) {
            alert('Seu carrinho está vazio.')
            return
        }

        navigate('/success', { replace: true })
    }

    return (
        <section className="checkout-page">
            <div className="container">
                <span className="badge">Checkout</span>

                <h1 className="section-title checkout-page__title">
                    Finalize seu pedido
                </h1>

                <p className="section-subtitle">
                    Preencha seus dados, escolha a forma de pagamento e revise o resumo da compra
                    antes de confirmar.
                </p>

                <div className="checkout-layout">
                    <form className="checkout-form card" onSubmit={handleSubmit}>
                        <h2>Dados do cliente</h2>

                        <div className="checkout-form__grid">
                            <div className="checkout-field">
                                <label htmlFor="name">Nome</label>
                                <input
                                    id="name"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Seu nome completo"
                                />
                            </div>

                            <div className="checkout-field">
                                <label htmlFor="email">E-mail</label>
                                <input
                                    id="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="seuemail@email.com"
                                    type="email"
                                />
                            </div>

                            <div className="checkout-field">
                                <label htmlFor="phone">Telefone</label>
                                <input
                                    id="phone"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="(11) 99999-9999"
                                />
                            </div>

                            <div className="checkout-field">
                                <label htmlFor="zip">CEP</label>
                                <input
                                    id="zip"
                                    name="zip"
                                    value={form.zip}
                                    onChange={handleChange}
                                    placeholder="00000-000"
                                />
                            </div>

                            <div className="checkout-field checkout-field--full">
                                <label htmlFor="address">Endereço</label>
                                <input
                                    id="address"
                                    name="address"
                                    value={form.address}
                                    onChange={handleChange}
                                    placeholder="Rua, número, complemento"
                                />
                            </div>

                            <div className="checkout-field">
                                <label htmlFor="city">Cidade</label>
                                <input
                                    id="city"
                                    name="city"
                                    value={form.city}
                                    onChange={handleChange}
                                    placeholder="São Paulo"
                                />
                            </div>

                            <div className="checkout-field">
                                <label htmlFor="state">Estado</label>
                                <input
                                    id="state"
                                    name="state"
                                    value={form.state}
                                    onChange={handleChange}
                                    placeholder="SP"
                                />
                            </div>
                        </div>

                        <h2 className="checkout-form__section-title">Pagamento</h2>

                        <div className="checkout-payment card">
                            <label className="checkout-radio">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="card"
                                    checked={form.payment === 'card'}
                                    onChange={handleChange}
                                />
                                Cartão (simulado)
                            </label>

                            <label className="checkout-radio">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="pix"
                                    checked={form.payment === 'pix'}
                                    onChange={handleChange}
                                />
                                Pix (simulado)
                            </label>
                        </div>

                        <button type="submit" className="btn btn-primary checkout-form__submit">
                            <FiLock />
                            Confirmar pedido
                        </button>

                        <Link to="/cart" className="btn btn-secondary checkout-form__back">
                            Voltar ao carrinho
                        </Link>
                    </form>

                    <aside className="checkout-summary card">
                        <h2>Resumo do pedido</h2>

                        {cartItems.length === 0 ? (
                            <p className="checkout-summary__empty">
                                Seu carrinho está vazio. Volte ao catálogo e adicione produtos para
                                continuar.
                            </p>
                        ) : (
                            <>
                                <div className="checkout-summary__list">
                                    {cartItems.map((item) => (
                                        <div className="checkout-summary__item" key={item.id}>
                                            <div className="checkout-summary__item-info">
                                                <strong>{item.name}</strong>
                                                <span>
                                                    {item.quantity}x • {formatPrice(item.price)}
                                                </span>
                                            </div>

                                            <strong>
                                                {formatPrice(item.price * item.quantity)}
                                            </strong>
                                        </div>
                                    ))}
                                </div>

                                <div className="checkout-summary__totals">
                                    <div>
                                        <span>Subtotal</span>
                                        <span>{formatPrice(cartTotal)}</span>
                                    </div>

                                    <div>
                                        <span>Frete</span>
                                        <span>
                                            {shipping === 0 ? 'Grátis' : formatPrice(shipping)}
                                        </span>
                                    </div>

                                    <div className="checkout-summary__total">
                                        <span>Total</span>
                                        <strong>{formatPrice(total)}</strong>
                                    </div>
                                </div>
                            </>
                        )}
                    </aside>
                </div>
            </div>
        </section>
    )
}

export default Checkout