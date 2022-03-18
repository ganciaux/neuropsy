const Order = require('../models/order')
const factory = require('./handlerFactory')
const catchAsync = require('../utils/catchAsync')
const orderGenerator = require('../utils/orderGenerator')
const pdfmake = require('../utils/pdfmake')

var ObjectId = require('mongoose').Types.ObjectId
const fs = require('fs')
var path = require('path')
const pdf = require('html-pdf')

const pdfTemplate = require('../utils/jsmastery')

exports.getAllOrders = factory.getAll(Order, [
  {
    path: 'clientId',
    select: 'firstname name',
  },
  {
    path: 'articles.articleId',
    select: 'name',
  },
])
exports.getOrder = factory.getOne(Order, [
  {
    path: 'client',
    select: 'firstname name',
  },
])
exports.createOrder = factory.createOne(Order)
exports.updateOrder = factory.updateOne(Order)
exports.deleteOrder = factory.deleteOne(Order)

exports.print = catchAsync(async (req, res, next) => {
  if (ObjectId.isValid(req.params.id) == true)
    query = Order.findById(req.params.id)
  else query = Order.findOne({ slug: req.params.id })

  query = query.populate([
    {
      path: 'client',
      select: 'birthdate firstname name',
    },
    {
      path: 'articles.articleId',
      select: 'name price label',
    },
  ])

  let doc = await query

  if (!doc) {
    return next(new AppError('No document found with this id', 404))
  }

  const orderPdf = new pdfmake(doc, {
    template: 'Commande',
    object: 'Commande',
  })

  const pdf = await orderPdf.generate()

  res.contentType('application/pdf')
  res.download(pdf, (err) => {
    if (err) console.log(err)
  })
})
