import { Link } from 'react-router-dom'
import { FiCheckCircle } from 'react-icons/fi'

function Success() {
    return (
        <section className="section">
            <div className="container">
                <span className="badge">Pedido confirmado</span>

                <h1 className="section-title" style={{ marginTop: '1rem' }}>
                    Compra finalizada com sucesso
                </h1>

                <p className="section-subtitle">
                    Seu pedido foi registrado com sucesso. Você pode continuar navegando ou voltar
                    ao catálogo.
                </p>

                <div
                    className="card"
                    style={{
                        marginTop: '2rem',
                        padding: '2rem',
                        display: 'grid',
                        gap: '1.25rem',
                        alignItems: 'center',
                        justifyItems: 'start',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <FiCheckCircle size={28} />
                        <strong>Pedido aprovado</strong>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <Link to="/products" className="btn btn-primary">
                            Voltar ao catálogo
                        </Link>

                        <Link to="/" className="btn btn-secondary">
                            Ir para home
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Success