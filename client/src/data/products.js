const base = import.meta.env.BASE_URL

const products = [
    // =========================
    // NOTEBOOKS
    // =========================
    {
        id: 1,
        name: "AstraBook Air 13",
        slug: "astrabook-air-13",
        category: "Notebooks",
        price: 4899.99,
        oldPrice: 5299.99,
        image: `${base}images/products/notebooks/astrabook-air-13.jpg`,
        badge: "Leve",
        description:
            "Notebook ultrafino com design premium, ideal para produtividade e mobilidade.",
    },
    {
        id: 2,
        name: "AstraBook Pro 14",
        slug: "astrabook-pro-14",
        category: "Notebooks",
        price: 5299.99,
        oldPrice: 5799.99,
        image: `${base}images/products/notebooks/astrabook-pro-14.jpg`,
        badge: "Destaque",
        description:
            "Performance avançada com construção em alumínio e tela de alta definição.",
    },
    {
        id: 3,
        name: "OrbitBook Ultra 15",
        slug: "orbitbook-ultra-15",
        category: "Notebooks",
        price: 6799.99,
        oldPrice: 7199.99,
        image: `${base}images/products/notebooks/orbitbook-ultra-15.jpg`,
        badge: "Performance",
        description:
            "Notebook poderoso para multitarefas intensas e fluxos de trabalho exigentes.",
    },
    {
        id: 4,
        name: "NovaBook X 14",
        slug: "novabook-x-14",
        category: "Notebooks",
        price: 5599.99,
        oldPrice: 5999.99,
        image: `${base}images/products/notebooks/novabook-x-14.jpg`,
        badge: "Novo",
        description:
            "Equilíbrio entre mobilidade, performance e autonomia de bateria.",
    },

    // =========================
    // MONITORS
    // =========================
    {
        id: 5,
        name: "OrbitView 24",
        slug: "orbitview-24",
        category: "Monitors",
        price: 1299.99,
        oldPrice: 1499.99,
        image: `${base}images/products/monitors/orbitview-24.jpg`,
        badge: "Full HD",
        description:
            "Monitor de 24 polegadas com painel IPS e cores vibrantes.",
    },
    {
        id: 6,
        name: "OrbitView 27 Pro",
        slug: "orbitview-27-pro",
        category: "Monitors",
        price: 1899.99,
        oldPrice: 2199.99,
        image: `${base}images/products/monitors/orbitview-27-pro.jpg`,
        badge: "Pro",
        description:
            "Monitor de 27 polegadas ideal para produtividade e criação visual.",
    },
    {
        id: 7,
        name: "NebulaView 34 UltraWide",
        slug: "nebulaview-34-ultrawide",
        category: "Monitors",
        price: 3299.99,
        oldPrice: 3599.99,
        image: `${base}images/products/monitors/nebulaview-34.jpg`,
        badge: "UltraWide",
        description:
            "Monitor ultrawide imersivo ideal para setups profissionais e criativos.",
    },

    // =========================
    // HEADSETS
    // =========================
    {
        id: 8,
        name: "NebulaSound One",
        slug: "nebulasound-one",
        category: "Headsets",
        price: 399.99,
        oldPrice: 449.99,
        image: `${base}images/products/headsets/nebulasound-one.jpg`,
        badge: "Áudio",
        description:
            "Headset confortável com áudio imersivo para trabalho e entretenimento.",
    },
    {
        id: 9,
        name: "NebulaSound Pro",
        slug: "nebulasound-pro",
        category: "Headsets",
        price: 599.99,
        oldPrice: 699.99,
        image: `${base}images/products/headsets/nebulasound-pro.jpg`,
        badge: "Premium",
        description:
            "Som cristalino com microfone otimizado para reuniões e streaming.",
    },
    {
        id: 10,
        name: "NovaWave X",
        slug: "novawave-x",
        category: "Headsets",
        price: 699.99,
        oldPrice: 799.99,
        image: `${base}images/products/headsets/novawave-x.jpg`,
        badge: "Wireless",
        description:
            "Headset sem fio com baixa latência e alta fidelidade sonora.",
    },

    // =========================
    // KEYBOARDS
    // =========================
    {
        id: 11,
        name: "NovaKeys TKL",
        slug: "novakeys-tkl",
        category: "Keyboards",
        price: 349.99,
        oldPrice: 399.99,
        image: `${base}images/products/keyboards/novakeys-tkl.jpg`,
        badge: "Compacto",
        description:
            "Teclado mecânico compacto com iluminação RGB.",
    },
    {
        id: 12,
        name: "NovaKeys Pro RGB",
        slug: "novakeys-pro-rgb",
        category: "Keyboards",
        price: 449.99,
        oldPrice: 499.99,
        image: `${base}images/products/keyboards/novakeys-pro.jpg`,
        badge: "RGB",
        description:
            "Teclado mecânico premium com switches rápidos e iluminação personalizável.",
    },

    // =========================
    // MICE
    // =========================
    {
        id: 13,
        name: "OrbitMouse Air",
        slug: "orbitmouse-air",
        category: "Mice",
        price: 199.99,
        oldPrice: 249.99,
        image: `${base}images/products/mice/orbitmouse-air.jpg`,
        badge: "Leve",
        description:
            "Mouse ergonômico leve e preciso para uso diário.",
    },
    {
        id: 14,
        name: "OrbitMouse Pro",
        slug: "orbitmouse-pro",
        category: "Mice",
        price: 299.99,
        oldPrice: 349.99,
        image: `${base}images/products/mice/orbitmouse-pro.jpg`,
        badge: "Precision",
        description:
            "Mouse de alta precisão com sensor avançado e design ergonômico.",
    },

    // =========================
    // ACCESSORIES
    // =========================
    {
        id: 15,
        name: "NovaDock Hub",
        slug: "novadock-hub",
        category: "Accessories",
        price: 249.99,
        oldPrice: 299.99,
        image: `${base}images/products/accessories/novadock-hub.jpg`,
        badge: "USB-C",
        description:
            "Hub USB-C com múltiplas portas para expandir seu setup.",
    },
    {
        id: 16,
        name: "NebulaPad XXL",
        slug: "nebulapad-xxl",
        category: "Accessories",
        price: 129.99,
        oldPrice: 159.99,
        image: `${base}images/products/accessories/nebulapad.jpg`,
        badge: "Deskmat",
        description:
            "Mousepad extra grande com superfície suave e base antiderrapante.",
    },
]

export default products