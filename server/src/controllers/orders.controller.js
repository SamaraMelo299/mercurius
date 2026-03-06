import orders from '../data/orders.js'
import products from '../data/products.js'
import { generateId, parsePrice } from '../utils/helpers.js'

export function getAllOrders(_req, res) {
    return res.status(200).json({
        success: true,
        total: orders.length,
        data: orders,
    })
}

export function getOrderById(req, res) {
    const id = Number(req.params.id)
    const order = orders.find((item) => item.id === id)

    if (!order) {
        return res.status(404).json({
            success: false,
            message: 'Pedido não encontrado.',
        })
    }

    return res.status(200).json({
        success: true,
        data: order,
    })
}

export function createOrder(req, res) {
    const { customer, items, payment = 'card' } = req.body

    if (!customer?.name || !customer?.email || !customer?.zip || !customer?.address) {
        return res.status(400).json({
            success: false,
            message: 'Preencha nome, e-mail, CEP e endereço do cliente.',
        })
    }

    if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Envie ao menos um item no pedido.',
        })
    }

    const normalizedItems = []

    for (const item of items) {
        const product = products.find((productItem) => productItem.id === Number(item.productId))

        if (!product) {
            return res.status(400).json({
                success: false,
                message: `Produto inválido no pedido: ${item.productId}`,
            })
        }

        const quantity = Number(item.quantity) || 1

        normalizedItems.push({
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity,
            subtotal: Number((product.price * quantity).toFixed(2)),
        })
    }

    const subtotal = normalizedItems.reduce((total, item) => total + item.subtotal, 0)
    const shipping = subtotal >= 800 ? 0 : 29.9
    const total = Number((subtotal + shipping).toFixed(2))

    const newOrder = {
        id: generateId(orders),
        customer: {
            name: String(customer.name).trim(),
            email: String(customer.email).trim(),
            phone: customer.phone ? String(customer.phone).trim() : '',
            zip: String(customer.zip).trim(),
            address: String(customer.address).trim(),
            city: customer.city ? String(customer.city).trim() : '',
            state: customer.state ? String(customer.state).trim() : '',
        },
        items: normalizedItems,
        payment,
        subtotal: parsePrice(subtotal),
        shipping: parsePrice(shipping),
        total: parsePrice(total),
        status: 'confirmed',
        createdAt: new Date().toISOString(),
    }

    orders.push(newOrder)

    return res.status(201).json({
        success: true,
        message: 'Pedido criado com sucesso.',
        data: newOrder,
    })
}