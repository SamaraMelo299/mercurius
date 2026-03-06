import { Router } from 'express'
import {
    getAllOrders,
    getOrderById,
    createOrder,
} from '../controllers/orders.controller.js'

const router = Router()

router.get('/', getAllOrders)
router.get('/:id', getOrderById)
router.post('/', createOrder)

export default router