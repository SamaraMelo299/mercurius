import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
    FiMenu,
    FiSearch,
    FiShoppingBag,
    FiX,
    FiTrash2,
    FiHome,
    FiGrid,
    FiStar,
    FiArrowUpRight,
    FiCreditCard,
} from 'react-icons/fi'
import { useCart } from '../../hooks/useCart'
import { useUI } from '../../context/UIContext'
import './Header.css'

function Header() {
    const { cartCount } = useCart()
    const { openCart } = useUI()
    const navigate = useNavigate()

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchText, setSearchText] = useState('')

    const searchRef = useRef(null)
    const hasCart = cartCount > 0
    const hasActiveSearch = searchText.trim().length > 0

    function openMenu() {
        setIsMenuOpen(true)
    }

    function closeMenu() {
        setIsMenuOpen(false)
    }

    function openSearch() {
        setIsSearchOpen(true)
    }

    function closeSearch() {
        setIsSearchOpen(false)
        setSearchText('')
    }

    function clearSearch() {
        setSearchText('')
        searchRef.current?.focus()
    }

    function submitSearch(e) {
        e.preventDefault()
        const q = searchText.trim()
        navigate(q ? `/products?q=${encodeURIComponent(q)}` : '/products')
        closeSearch()
    }

    function applyChip(value) {
        const q = value.trim()
        navigate(`/products?q=${encodeURIComponent(q)}`)
        closeSearch()
    }

    useEffect(() => {
        const shouldLock = isMenuOpen || isSearchOpen
        if (!shouldLock) return

        const prevOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        function onKey(e) {
            if (e.key === 'Escape') {
                closeMenu()
                closeSearch()
            }
        }

        window.addEventListener('keydown', onKey)

        return () => {
            document.body.style.overflow = prevOverflow
            window.removeEventListener('keydown', onKey)
        }
    }, [isMenuOpen, isSearchOpen])

    useEffect(() => {
        if (!isSearchOpen) return
        setTimeout(() => searchRef.current?.focus(), 0)
    }, [isSearchOpen])

    const cartBadge = useMemo(() => {
        if (!hasCart) return null
        return <span className="tech-drawer__badge">{cartCount}</span>
    }, [hasCart, cartCount])

    return (
        <>
            <header className="tech-header">
                <div className="container tech-header__container">
                    <Link to="/" className="tech-header__brand" onClick={closeMenu}>
                        <img
                            src="/logo/mercurius-logo.png"
                            alt="Mercurius"
                            className="tech-header__logo"
                        />
                    </Link>

                    <nav className="tech-header__nav">
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/products">Produtos</NavLink>
                        <a href="/#featured">Destaques</a>
                    </nav>

                    <div className="tech-header__actions">
                        <button
                            type="button"
                            className="tech-header__icon"
                            aria-label="Buscar"
                            onClick={openSearch}
                        >
                            <FiSearch />
                        </button>

                        <button
                            type="button"
                            className="tech-header__icon"
                            aria-label="Abrir carrinho"
                            onClick={openCart}
                        >
                            <FiShoppingBag />
                            {cartCount > 0 && (
                                <span className="tech-header__cart-badge">{cartCount}</span>
                            )}
                        </button>

                        <button
                            type="button"
                            className="tech-header__menu-button"
                            aria-label="Abrir menu"
                            onClick={openMenu}
                        >
                            <FiMenu />
                        </button>
                    </div>
                </div>
            </header>

            {isSearchOpen && (
                <>
                    <div className="tech-search__overlay" onClick={closeSearch} />

                    <div
                        className="tech-search"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Buscar produtos"
                    >
                        <div className="tech-search__top">
                            <div>
                                <strong>Buscar produtos</strong>
                                <p>Encontre itens por nome, categoria ou tipo de produto.</p>
                            </div>

                            <button
                                type="button"
                                className="tech-search__close"
                                onClick={closeSearch}
                                aria-label="Fechar"
                            >
                                <FiX />
                            </button>
                        </div>

                        <form className="tech-search__form" onSubmit={submitSearch}>
                            <div className="tech-search__row">
                                <div className="tech-search__input-wrap">
                                    <input
                                        ref={searchRef}
                                        type="text"
                                        value={searchText}
                                        onChange={(e) => setSearchText(e.target.value)}
                                        placeholder="Buscar notebook, headset, monitor, teclado..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="tech-search__icon-button tech-search__icon-button--primary"
                                    aria-label="Buscar"
                                    title="Buscar"
                                >
                                    <FiSearch />
                                </button>

                                <button
                                    type="button"
                                    className={`tech-search__icon-button tech-search__icon-button--ghost ${hasActiveSearch ? '' : 'is-disabled'
                                        }`}
                                    onClick={clearSearch}
                                    aria-label="Limpar"
                                    title="Limpar"
                                    disabled={!hasActiveSearch}
                                >
                                    <FiTrash2 />
                                </button>
                            </div>
                        </form>

                        <div className="tech-search__chips">
                            <button type="button" onClick={() => applyChip('notebook')}>
                                Notebook
                            </button>
                            <button type="button" onClick={() => applyChip('monitor')}>
                                Monitor
                            </button>
                            <button type="button" onClick={() => applyChip('headset')}>
                                Headset
                            </button>
                            <button type="button" onClick={() => applyChip('teclado')}>
                                Teclado
                            </button>
                        </div>
                    </div>
                </>
            )}

            <div
                className={`tech-drawer__overlay ${isMenuOpen ? 'is-open' : ''}`}
                onClick={closeMenu}
            />

            <aside className={`tech-drawer ${isMenuOpen ? 'is-open' : ''}`}>
                <div className="tech-drawer__header">
                    <div className="tech-drawer__headline">
                        <strong>Menu</strong>
                        <span>Navegação rápida</span>
                    </div>

                    <button
                        type="button"
                        className="tech-drawer__close"
                        onClick={closeMenu}
                        aria-label="Fechar menu"
                    >
                        <FiX />
                    </button>
                </div>

                <nav className="tech-drawer__nav">
                    <NavLink to="/" onClick={closeMenu} className="tech-drawer__item">
                        <span className="tech-drawer__left">
                            <FiHome />
                            Home
                        </span>
                        <FiArrowUpRight />
                    </NavLink>

                    <NavLink to="/products" onClick={closeMenu} className="tech-drawer__item">
                        <span className="tech-drawer__left">
                            <FiGrid />
                            Produtos
                        </span>
                        <FiArrowUpRight />
                    </NavLink>

                    <a href="/#featured" onClick={closeMenu} className="tech-drawer__item">
                        <span className="tech-drawer__left">
                            <FiStar />
                            Destaques
                        </span>
                        <FiArrowUpRight />
                    </a>

                    <button
                        type="button"
                        className="tech-drawer__item"
                        onClick={() => {
                            closeMenu()
                            openCart()
                        }}
                    >
                        <span className="tech-drawer__left">
                            <FiShoppingBag />
                            Abrir carrinho
                        </span>

                        <span className="tech-drawer__right">
                            {cartBadge}
                            <FiArrowUpRight />
                        </span>
                    </button>
                </nav>

                {hasCart && (
                    <div className="tech-drawer__footer">
                        <Link to="/products" className="btn btn-secondary" onClick={closeMenu}>
                            Continuar comprando
                        </Link>

                        <Link to="/checkout" className="btn btn-primary" onClick={closeMenu}>
                            <FiCreditCard />
                            Checkout
                        </Link>
                    </div>
                )}
            </aside>
        </>
    )
}

export default Header