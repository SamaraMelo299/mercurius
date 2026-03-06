
import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiShoppingBag } from 'react-icons/fi'
import formatPrice from '../../utils/formatPrice'
import { useCart } from '../../hooks/useCart'
import { useToast } from '../../hooks/useToast'
import { useUI } from '../../context/UIContext'
import './ProductCard.css'

function ProductCard({ product }) {
    const { addToCart } = useCart()
    const { showToast } = useToast()
    const { openCart } = useUI()

    const hasOldPrice = typeof product.oldPrice === 'number' && product.oldPrice > product.price

    function handleAddToCart() {
        addToCart(product)
        openCart()

        showToast({
            title: 'Produto adicionado',
            message: product.name,
            type: 'success',
        })
    }

    return (
        <article className="tech-product-card card">
            <div className="tech-product-card__media">
                {product.badge && (
                    <span className="tech-product-card__badge">{product.badge}</span>
                )}

                <Link
                    to={`/products/${product.slug}`}
                    className="tech-product-card__image-link"
                    aria-label={`Ver detalhes de ${product.name}`}
                >
                    <img src={product.image} alt={product.name} />
                </Link>
            </div>

            <div className="tech-product-card__content">
                <div className="tech-product-card__top">
                    <span className="tech-product-card__category">{product.category}</span>

                    <Link
                        to={`/products/${product.slug}`}
                        className="tech-product-card__details-link"
                        aria-label={`Ver detalhes de ${product.name}`}
                    >
                        <FiArrowUpRight />
                    </Link>
                </div>

                <h3 className="tech-product-card__title">
                    <Link to={`/products/${product.slug}`}>{product.name}</Link>
                </h3>

                <p className="tech-product-card__description">{product.description}</p>

                <div className="tech-product-card__prices">
                    <strong>{formatPrice(product.price)}</strong>
                    {hasOldPrice && <span>{formatPrice(product.oldPrice)}</span>}
                </div>

                <button
                    type="button"
                    className="tech-product-card__button"
                    onClick={handleAddToCart}
                >
                    <FiShoppingBag />
                    Adicionar ao carrinho
                </button>
            </div>
        </article>
    )
}

export default ProductCard