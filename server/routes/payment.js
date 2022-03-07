const express = require('express')
const payment = require('../controllers/payment')
const router = express.Router()

//payment
router.get('/', payment.getAllPayments)
router.get('/:id', payment.getPayment)
router.post('/', payment.createPayment)
router.put('/:id', payment.updatePayment)
router.delete('/:id', payment.deletePayment)

module.exports = router
