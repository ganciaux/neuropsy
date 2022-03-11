const Order = require('../models/order')
const factory = require('./handlerFactory')
const catchAsync = require('../utils/catchAsync')
const orderGenerator = require('../utils/orderGenerator')
var ObjectId = require('mongoose').Types.ObjectId
const fs = require('fs')
var path = require('path')

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
    path: 'clientId',
    select: 'firstname name',
  },
  {
    path: 'articles.articleId',
    select: 'name price label',
  },
])
exports.createOrder = factory.createOne(Order)
exports.updateOrder = factory.updateOne(Order)
exports.deleteOrder = factory.deleteOne(Order)

exports.print = catchAsync(async (req, res, next) => {
  console.log('print')
  if (ObjectId.isValid(req.params.id) == true)
    query = Order.findById(req.params.id)
  else query = Order.find({ slug: req.params.id })

  query = query.populate([
    {
      path: 'clientId',
      select: 'firstname name',
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
  if (doc.length === 0) {
    return next(new AppError('No document found with this slug', 404))
  }

  if (Array.isArray(doc)) doc = doc[0]

  console.log('order print: before call')

  const orderPdf = new orderGenerator(doc)

  const pdf = orderPdf.generate()

  console.log('order print: before call', pdf.path, pdf.fullName)

  /*
  res.status(200).json({
    status: 'success',
    data: pdf,
  })*/
  //res.status(200).attachment(pdf.fullName)
  res.contentType('application/pdf')
  res.download(path.join(__dirname, '../files/order-2022030001.pdf'), (err) => {
    if (err) console.log(err)
  })

  //res.download(pdf.fullName)
})
