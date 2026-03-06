import products from '../data/products.js'

export function getAllCategories(_req, res) {
    const categories = [...new Set(products.map((product) => product.category))]

    return res.status(200).json({
        success: true,
        total: categories.length,
        data: categories,
    })
}