import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FiShoppingBag, FiArrowLeft } from 'react-icons/fi'
import { getProductBySlug } from '../services/api'
import formatPrice from '../utils/formatPrice'
import { useCart } from '../hooks/useCart'
import './ProductDetails.css'

function ProductDetails() {
    const { slug } = useParams()
    const { addToCart } = useCart()

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        async function loadProduct() {
            try {
                const data = await getProductBySlug(slug)
                setProduct(data)
            } catch (err) {
                setError('O item que você tentou acessar não existe ou não está disponível.')
            } finally {
                setLoading(false)
            }
        }

        loadProduct()
    }, [slug])

    function handleAddToCart() {
        if (product) {
            addToCart(product)
        }
    }

    if (loading) {
        return (
            <section className="section">
                <div className="container">
                    <h1 className="section-title">Carregando produto...</h1>
                </div>
            </section>
        )
    }

    if (error || !product) {
        return (
            <section className="section">
                <div className="container">
                    <h1 className="section-title">Produto não encontrado</h1>
                    <p className="section-subtitle">
                        {error || 'O item que você tentou acessar não existe ou não está disponível.'}
                    </p>

                    <div style={{ marginTop: '1.5rem' }}>
                        <Link to="/products" className="btn btn-primary">
                            Voltar para produtos
                        </Link>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="section">
            <div className="container">
                <Link to="/products" className="product-details__back">
                    <FiArrowLeft />
                    Voltar para produtos
                </Link>

                <div className="product-details">
                    <div className="product-details__image card">
                        <span className="product-details__badge">{product.badge}</span>
                        <img
                            src={`${import.meta.env.BASE_URL}${product.image.replace(/^\//, '')}`}
                            alt={product.name}
                        />
                    </div>

                    <div className="product-details__content">
                        <span className="product-details__category">{product.category}</span>

                        <h1>{product.name}</h1>

                        <div className="product-details__prices">
                            <strong>{formatPrice(product.price)}</strong>
                            <span>{formatPrice(product.oldPrice)}</span>
                        </div>

                        <p className="product-details__description">{product.description}</p>

                        <div className="product-details__actions">
                            <button className="btn btn-primary" onClick={handleAddToCart}>
                                <FiShoppingBag />
                                Adicionar ao carrinho
                            </button>

                            <Link to="/cart" className="btn btn-secondary">
                                Ver carrinho
                            </Link>
                        </div>

                        <div className="product-details__info card">
                            <div>
                                <h3>Conforto premium</h3>
                                <p>
                                    Construção pensada para uso urbano, rotina dinâmica e visual
                                    moderno.
                                </p>
                            </div>

                            <div>
                                <h3>Design esportivo</h3>
                                <p>
                                    Uma estética inspirada em performance, com presença forte e
                                    acabamento refinado.
                                </p>
                            </div>

                            <div>
                                <h3>Entrega e suporte</h3>
                                <p>
                                    Frete grátis em pedidos selecionados e troca facilitada em até
                                    30 dias.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductDetails