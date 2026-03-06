import { Link } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
    return (
        <section className="not-found-page">
            <div className="container">
                <h1 className="section-title">Página não encontrada</h1>

                <p className="section-subtitle">
                    O conteúdo que você tentou acessar não existe, foi movido ou não está
                    disponível no momento.
                </p>

                <div className="not-found-page__actions">
                    <Link to="/" className="btn btn-primary">
                        Voltar para a home
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default NotFound