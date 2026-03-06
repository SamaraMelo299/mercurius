import { useEffect, useState } from 'react'
import Hero from '../components/Hero/Hero'
import Categories from '../components/Categories/Categories'
import ProductCard from '../components/ProductCard/ProductCard'
import { getProducts } from '../services/api'

function Home() {
    const [featuredProducts, setFeaturedProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        async function loadFeaturedProducts() {
            try {
                const data = await getProducts()
                setFeaturedProducts(data.slice(0, 4))
            } catch (err) {
                setError('Não foi possível carregar os produtos em destaque.')
            } finally {
                setLoading(false)
            }
        }

        loadFeaturedProducts()
    }, [])

    return (
        <>
            <Hero />
            <Categories />

            <section className="featured-section" id="featured">
                <div className="container">
                    <div className="featured-section__header">
                        <span className="badge">Destaques</span>
                        <h2 className="section-title">Produtos em destaque</h2>
                        <p className="section-subtitle">
                            Uma seleção pensada para unir performance, design e funcionalidade
                            em um catálogo tech mais forte e mais profissional.
                        </p>
                    </div>

                    {loading ? (
                        <p className="section-subtitle">Carregando produtos em destaque...</p>
                    ) : error ? (
                        <p className="section-subtitle">{error}</p>
                    ) : (
                        <div className="products-grid">
                            {featuredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

export default Home