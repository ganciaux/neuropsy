const express = require('express')
const order = require('../controllers/order')
const router = express.Router()

//order
router.get('/', order.getAllOrders)
router.get('/:id', order.getOrder)
router.post('/', order.createOrder)
router.put('/:id', order.updateOrder)
router.delete('/:id', order.deleteOrder)

module.exports = router
