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
  'client',
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

  const pdf = await orderPdf.generateTest()

  console.log('order print: before call', pdf.path, pdf.fullName)

  /*
  const orderPdf = new pdfmake(doc)

  const pdf = await orderPdf.generate()

  console.log('order print: before call', pdf)
*/

  /*
  res.status(200).json({
    status: 'success',
    data: pdf,
  })*/

  res.contentType('application/pdf')
  res.download(path.join(__dirname, pdf.fullName), (err) => {
    if (err) console.log(err)
  })

  //res.download(pdf.fullName)
})

exports.printPdf = catchAsync(async (req, res, next) => {
  pdf
    .create(
      pdfTemplate({
        name: 'ghis',
        price1: '10',
        price2: '11',
        receiptId: '12',
      }),
      {},
    )
    .toFile(`${__dirname}/result.pdf`, (err) => {
      if (err) {
        res.send(Promise.reject())
      }

      res.send(Promise.resolve())
    })
})

exports.fetchPdf = catchAsync(async (req, res, next) => {
  res.sendFile(`${__dirname}/result.pdf`)
})
