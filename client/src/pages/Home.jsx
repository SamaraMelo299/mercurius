import Hero from '../components/Hero/Hero'
import Categories from '../components/Categories/Categories'
import ProductCard from '../components/ProductCard/ProductCard'
import products from '../data/products'

function Home() {
    const featuredProducts = products.slice(0, 4)

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

                    <div className="products-grid">
                        {featuredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home