import { useEffect, useMemo, useRef, useState } from 'react'
import { FiTrash2 } from 'react-icons/fi'
import './FilterBar.css'

const sortOptions = [
    { value: 'default', label: 'Destaque' },
    { value: 'price-asc', label: 'Menor preço' },
    { value: 'price-desc', label: 'Maior preço' },
    { value: 'name-asc', label: 'Nome A–Z' },
]

function useOutsideClose(ref, onClose) {
    useEffect(() => {
        function handle(event) {
            if (ref.current && !ref.current.contains(event.target)) onClose()
        }
        document.addEventListener('mousedown', handle)
        return () => document.removeEventListener('mousedown', handle)
    }, [ref, onClose])
}

function FilterBar({
    search,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    categories,
    onResetAll,
}) {
    const categoryRef = useRef(null)
    const sortRef = useRef(null)

    const [isCategoryOpen, setIsCategoryOpen] = useState(false)
    const [isSortOpen, setIsSortOpen] = useState(false)

    useOutsideClose(categoryRef, () => setIsCategoryOpen(false))
    useOutsideClose(sortRef, () => setIsSortOpen(false))

    const categoryOptions = useMemo(() => {
        return [{ value: 'all', label: 'Todas' }].concat(
            categories.map((c) => ({ value: c, label: c }))
        )
    }, [categories])

    const activeCategoryLabel =
        categoryOptions.find((o) => o.value === selectedCategory)?.label || 'Todas'

    const activeSortLabel = sortOptions.find((o) => o.value === sortBy)?.label || 'Destaque'

    const hasAnyFilter =
        (search && search.trim().length > 0) || selectedCategory !== 'all' || sortBy !== 'default'

    return (
        <div className="filter-bar card" role="region" aria-label="Filtros">
            <div className="filter-bar__head">
                <div className="filter-bar__meta">
                    <span className="filter-bar__title">Filtros</span>

                    {search?.trim() && (
                        <span className="filter-bar__chip" title={`Buscando: ${search.trim()}`}>
                            Buscando: “{search.trim()}”
                        </span>
                    )}
                </div>

                <button
                    type="button"
                    className={`filter-bar__clearIcon ${hasAnyFilter ? '' : 'is-disabled'}`}
                    onClick={onResetAll}
                    aria-label="Limpar tudo"
                    title="Limpar tudo"
                    disabled={!hasAnyFilter}
                >
                    <FiTrash2 />
                </button>
            </div>

            <div className="filter-bar__grid">
                <div className="filter-bar__field">
                    <label>Categoria</label>

                    <div className="custom-select" ref={categoryRef}>
                        <button
                            type="button"
                            className={`custom-select__trigger ${isCategoryOpen ? 'is-open' : ''}`}
                            onClick={() => setIsCategoryOpen((prev) => !prev)}
                            aria-haspopup="listbox"
                            aria-expanded={isCategoryOpen}
                        >
                            <span>{activeCategoryLabel}</span>
                            <span className="custom-select__arrow">▾</span>
                        </button>

                        {isCategoryOpen && (
                            <div className="custom-select__menu" role="listbox">
                                {categoryOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        className={`custom-select__option ${selectedCategory === option.value ? 'is-active' : ''
                                            }`}
                                        onClick={() => {
                                            setSelectedCategory(option.value)
                                            setIsCategoryOpen(false)
                                        }}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="filter-bar__field">
                    <label>Ordenar por</label>

                    <div className="custom-select" ref={sortRef}>
                        <button
                            type="button"
                            className={`custom-select__trigger ${isSortOpen ? 'is-open' : ''}`}
                            onClick={() => setIsSortOpen((prev) => !prev)}
                            aria-haspopup="listbox"
                            aria-expanded={isSortOpen}
                        >
                            <span>{activeSortLabel}</span>
                            <span className="custom-select__arrow">▾</span>
                        </button>

                        {isSortOpen && (
                            <div className="custom-select__menu" role="listbox">
                                {sortOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        className={`custom-select__option ${sortBy === option.value ? 'is-active' : ''}`}
                                        onClick={() => {
                                            setSortBy(option.value)
                                            setIsSortOpen(false)
                                        }}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterBar