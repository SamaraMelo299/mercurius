import './Footer.css'

function Footer() {
    return (
        <footer className="tech-footer">
            <div className="container tech-footer__container">
                <div className="tech-footer__brand">
                    <h3>TECH STORE</h3>
                    <p>
                        E-commerce fictício de eletrônicos com foco em design premium,
                        responsividade, catálogo moderno e experiência de compra pensada
                        para portfólio.
                    </p>
                </div>

                <div className="tech-footer__column">
                    <h4>Navegação</h4>
                    <ul>
                        <li>Home</li>
                        <li>Produtos</li>
                        <li>Carrinho</li>
                        <li>Checkout</li>
                    </ul>
                </div>

                <div className="tech-footer__column">
                    <h4>Projeto</h4>
                    <ul>
                        <li>React</li>
                        <li>Node.js</li>
                        <li>Responsivo</li>
                        <li>UI moderna</li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer