import { Link } from 'react-router-dom'
import './Categories.css'

const categories = [
    {
        title: 'Notebooks',
        description: 'Modelos premium para produtividade, estudo e criação.',
        image: '/images/products/notebooks/astrabook-pro-14.jpg',
        slug: 'Notebooks',
    },
    {
        title: 'Monitores',
        description: 'Mais definição, espaço visual e imersão para seu setup.',
        image: '/images/products/monitors/nebulaview-34.jpg',
        slug: 'Monitores',
    },
    {
        title: 'Headsets',
        description: 'Áudio de qualidade para trabalho, chamadas e entretenimento.',
        image: '/images/products/headsets/novawave-x.jpg',
        slug: 'Headsets',
    },
    {
        title: 'Teclados',
        description: 'Mais conforto, precisão e presença visual na sua mesa.',
        image: '/images/products/keyboards/novakeys-tkl.jpg',
        slug: 'Teclados',
    },
    {
        title: 'Mouses',
        description: 'Controle, ergonomia e desempenho para diferentes rotinas.',
        image: '/images/products/mice/orbitmouse-pro.jpg',
        slug: 'Mouses',
    },
    {
        title: 'Acessórios',
        description: 'Complementos essenciais para um setup moderno e funcional.',
        image: '/images/products/accessories/nebulapad.jpg',
        slug: 'Acessorios',
    },
]

function Categories() {
    return (
        <section className="tech-categories">
            <div className="container">
                <div className="tech-categories__header">
                    <span className="badge">Categorias</span>
                    <h2 className="section-title">Explore por categoria</h2>
                    <p className="section-subtitle">
                        Encontre produtos para produtividade, entretenimento e setups completos
                        com uma navegação mais prática.
                    </p>
                </div>

                <div className="tech-categories__grid">
                    {categories.map((category) => (
                        <Link
                            key={category.title}
                            to={`/products?category=${encodeURIComponent(category.slug)}`}
                            className="tech-categories__card"
                        >
                            <div className="tech-categories__image-wrap">
                                <img src={category.image} alt={category.title} />
                            </div>

                            <div className="tech-categories__content">
                                <h3>{category.title}</h3>
                                <p>{category.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Categories