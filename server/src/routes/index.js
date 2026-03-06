import { Router } from 'express'
import productsRoutes from './products.routes.js'
import categoriesRoutes from './categories.routes.js'
import ordersRoutes from './orders.routes.js'

const router = Router()

router.use('/products', productsRoutes)
router.use('/categories', categoriesRoutes)
router.use('/orders', ordersRoutes)

export default router