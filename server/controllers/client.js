const Client = require('../models/client')
const Payment = require('../models/payment')
const Session = require('../models/session')
const Order = require('../models/order')
const catchAsync = require('../utils/catchAsync')
const factory = require('./handlerFactory')
const AppError = require('../utils/appError')

var ObjectId = require('mongoose').Types.ObjectId

exports.getAllClients = factory.getAll(Client)
exports.getClient = factory.getOne(Client)
exports.createClient = factory.createOne(Client)
exports.updateClient = factory.updateOne(Client)
exports.deleteClient = factory.deleteOne(Client)
exports.detailsClient = catchAsync(async (req, res, next) => {
  if (ObjectId.isValid(req.params.id) == true)
    query = Client.findById(req.params.id)
  else query = Client.findOne({ slug: req.params.id })

  query = query.populate(['sessions', 'orders', 'payments'])

  doc = await query
  if (!doc) {
    return next(new AppError('No document found with this id', 404))
  }

  res.status(200).json({
    status: 'success',
    data: doc,
  })
})
