const express = require('express')
const order = require('../controllers/order')
const router = express.Router()

//order
router.get('/', order.getAllOrders)
router.get('/fetch-pdf', order.fetchPdf)
router.get('/:id', order.getOrder)
router.get('/print/:id', order.print)
router.post('/', order.createOrder)
router.post('/create-pdf', order.printPdf)
router.put('/:id', order.updateOrder)
router.delete('/:id', order.deleteOrder)

module.exports = router
