const Payment = require('../models/payment')
const factory = require('./handlerFactory')

exports.getAllPayments = factory.getAll(Payment, {
  path: 'clientId',
  select: 'firstname, name',
})
exports.getPayment = factory.getOne(Payment)
exports.createPayment = factory.createOne(Payment)
exports.updatePayment = factory.updateOne(Payment)
exports.deletePayment = factory.deleteOne(Payment)
