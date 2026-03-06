import products from '../data/products.js'
import { generateId, normalizeText, parsePrice } from '../utils/helpers.js'

export function getAllProducts(req, res) {
    const { category, q, sort } = req.query

    let filteredProducts = [...products]

    if (category && category !== 'all') {
        filteredProducts = filteredProducts.filter(
            (product) => normalizeText(product.category) === normalizeText(category)
        )
    }

    if (q) {
        const searchTerm = normalizeText(q)

        filteredProducts = filteredProducts.filter((product) => {
            const searchableContent = normalizeText(
                `${product.name} ${product.category} ${product.badge || ''} ${product.description || ''}`
            )

            return searchableContent.includes(searchTerm)
        })
    }

    if (sort === 'price-asc') {
        filteredProducts.sort((a, b) => a.price - b.price)
    }

    if (sort === 'price-desc') {
        filteredProducts.sort((a, b) => b.price - a.price)
    }

    if (sort === 'name-asc') {
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
    }

    return res.status(200).json({
        success: true,
        total: filteredProducts.length,
        data: filteredProducts,
    })
}

export function getProductById(req, res) {
    const id = Number(req.params.id)
    const product = products.find((item) => item.id === id)

    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Produto não encontrado.',
        })
    }

    return res.status(200).json({ success: true, data: product })
}

export function getProductBySlug(req, res) {
    const { slug } = req.params
    const product = products.find((item) => item.slug === slug)

    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Produto não encontrado.',
        })
    }

    return res.status(200).json({ success: true, data: product })
}

export function createProduct(req, res) {
    const { name, slug, category, price, oldPrice, image, badge, description } = req.body

    if (!name || !slug || !category || !price || !image || !description) {
        return res.status(400).json({
            success: false,
            message: 'Preencha nome, slug, categoria, preço, imagem e descrição.',
        })
    }

    const slugAlreadyExists = products.some((item) => item.slug === slug)

    if (slugAlreadyExists) {
        return res.status(409).json({
            success: false,
            message: 'Já existe um produto com esse slug.',
        })
    }

    const newProduct = {
        id: generateId(products),
        name: String(name).trim(),
        slug: String(slug).trim(),
        category: String(category).trim(),
        price: parsePrice(price),
        oldPrice: oldPrice ? parsePrice(oldPrice) : null,
        image: String(image).trim(),
        badge: badge ? String(badge).trim() : '',
        description: String(description).trim(),
    }

    products.push(newProduct)

    return res.status(201).json({
        success: true,
        message: 'Produto criado com sucesso.',
        data: newProduct,
    })
}

export function updateProduct(req, res) {
    const id = Number(req.params.id)
    const productIndex = products.findIndex((item) => item.id === id)

    if (productIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Produto não encontrado.',
        })
    }

    const currentProduct = products[productIndex]
    const updatedProduct = {
        ...currentProduct,
        ...req.body,
        id: currentProduct.id,
        price: req.body.price ? parsePrice(req.body.price) : currentProduct.price,
        oldPrice: req.body.oldPrice
            ? parsePrice(req.body.oldPrice)
            : req.body.oldPrice === null
                ? null
                : currentProduct.oldPrice,
    }

    products[productIndex] = updatedProduct

    return res.status(200).json({
        success: true,
        message: 'Produto atualizado com sucesso.',
        data: updatedProduct,
    })
}

export function deleteProduct(req, res) {
    const id = Number(req.params.id)
    const productIndex = products.findIndex((item) => item.id === id)

    if (productIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Produto não encontrado.',
        })
    }

    const [removedProduct] = products.splice(productIndex, 1)

    return res.status(200).json({
        success: true,
        message: 'Produto removido com sucesso.',
        data: removedProduct,
    })
}