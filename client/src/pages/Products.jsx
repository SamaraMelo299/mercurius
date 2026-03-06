import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ProductCard from '../components/ProductCard/ProductCard'
import FilterBar from '../components/FilterBar/FilterBar'
import { getProducts } from '../services/api'
import './Products.css'

function Products() {
    const location = useLocation()
    const navigate = useNavigate()

    const [productsData, setProductsData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [search, setSearch] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [sortBy, setSortBy] = useState('default')

    useEffect(() => {
        async function loadProducts() {
            try {
                const data = await getProducts()
                setProductsData(data)
            } catch (err) {
                setError('Não foi possível carregar os produtos.')
            } finally {
                setLoading(false)
            }
        }

        loadProducts()
    }, [])

    const categories = useMemo(() => {
        const set = new Set(productsData.map((product) => product.category))
        return Array.from(set)
    }, [productsData])

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const q = params.get('q') || ''
        const categoryFromUrl = params.get('category') || 'all'

        const isValidCategory =
            categoryFromUrl === 'all' || categories.includes(categoryFromUrl)

        setSearch(q)
        setSelectedCategory(isValidCategory ? categoryFromUrl : 'all')
    }, [location.search, categories])

    const filteredProducts = useMemo(() => {
        const q = search.trim().toLowerCase()

        let list = productsData.filter((product) => {
            const matchesCategory =
                selectedCategory === 'all' || product.category === selectedCategory

            const matchesSearch =
                q.length === 0
                    ? true
                    : `${product.name} ${product.category} ${product.badge ?? ''} ${product.description ?? ''}`
                        .toLowerCase()
                        .includes(q)

            return matchesCategory && matchesSearch
        })

        const priceValue = (value) =>
            typeof value === 'number' && value > 0 ? value : Number.POSITIVE_INFINITY

        if (sortBy === 'price-asc') {
            list = [...list].sort((a, b) => priceValue(a.price) - priceValue(b.price))
        }

        if (sortBy === 'price-desc') {
            list = [...list].sort((a, b) => priceValue(b.price) - priceValue(a.price))
        }

        if (sortBy === 'name-asc') {
            list = [...list].sort((a, b) => a.name.localeCompare(b.name))
        }

        return list
    }, [productsData, search, selectedCategory, sortBy])

    function resetAll() {
        setSearch('')
        setSelectedCategory('all')
        setSortBy('default')
        navigate('/products', { replace: true })
    }

    if (loading) {
        return (
            <section className="products-section">
                <div className="container">
                    <div className="products-hero">
                        <span className="badge">Catálogo</span>
                        <h1 className="section-title products-title">Produtos</h1>
                        <p className="section-subtitle products-subtitle">
                            Carregando produtos...
                        </p>
                    </div>
                </div>
            </section>
        )
    }

    if (error) {
        return (
            <section className="products-section">
                <div className="container">
                    <div className="products-hero">
                        <span className="badge">Catálogo</span>
                        <h1 className="section-title products-title">Produtos</h1>
                        <p className="section-subtitle products-subtitle">{error}</p>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="products-section">
            <div className="container">
                <div className="products-hero">
                    <span className="badge">Catálogo</span>

                    <h1 className="section-title products-title">Produtos</h1>

                    <p className="section-subtitle products-subtitle">
                        Explore notebooks, monitores, headsets e periféricos com filtros por
                        categoria e ordenação.
                    </p>
                </div>

                <FilterBar
                    search={search}
                    setSearch={setSearch}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    categories={categories}
                    onResetAll={resetAll}
                />

                <p className="products-count">
                    {filteredProducts.length}{' '}
                    {filteredProducts.length === 1
                        ? 'produto encontrado'
                        : 'produtos encontrados'}
                </p>

                {filteredProducts.length > 0 ? (
                    <div className="products-grid">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="products-empty">
                        <h2>Nenhum produto encontrado</h2>
                        <p>
                            Use a lixeira para limpar a busca e os filtros e visualizar todos os
                            produtos novamente.
                        </p>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Products