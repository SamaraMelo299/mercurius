import { Link } from 'react-router-dom'
import './Hero.css'

function Hero() {
  return (
    <section className="tech-hero">
      <div className="container tech-hero__container">
        <div className="tech-hero__content">
          <span className="badge">Tecnologia premium</span>

          <h1>
            Monte um setup
            <span> moderno, potente e funcional</span>
          </h1>

          <p>
            Explore notebooks, monitores, headsets e periféricos com design
            refinado, alta performance e uma experiência visual pensada para
            elevar este projeto a um e-commerce tech mais forte para portfólio.
          </p>

          <div className="tech-hero__actions">
            <Link to="/products" className="btn btn-primary">
              Explorar produtos
            </Link>

            <a href="#featured" className="btn btn-secondary">
              Ver destaques
            </a>
          </div>

          <ul className="tech-hero__benefits">
            <li>Frete grátis</li>
            <li>Compra segura</li>
            <li>Lançamentos em destaque</li>
          </ul>
        </div>

        <div className="tech-hero__visual">
          <div className="tech-hero__glow"></div>

          <img
            src={`${import.meta.env.BASE_URL}images/hero/tech-hero-main.jpg`}
            alt="Setup premium em destaque"
          />

          <div className="tech-hero__floating-card card">
            <span>Destaque da semana</span>
            <strong>AstraBook Pro 14</strong>
            <p>Design premium, mobilidade e performance para setups modernos.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero