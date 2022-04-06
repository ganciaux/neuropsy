const Client = require('../models/client')
const Payment = require('../models/payment')
const catchAsync = require('../utils/catchAsync')
var ObjectId = require('mongoose').Types.ObjectId
const APIFeatures = require('../utils/apiFeatures')

exports.getAllReport = catchAsync(async (req, res, next) => {
  console.log('getAllReport:', req.query)

  const docs = await Payment.aggregate([
    {
      $match: { type: 3 },
    },
    {
      $group: {
        _id: null,
        total: { $sum: '$price' },
        count: { $sum: 1 },
      },
    },
  ])
  /*
  {
  _id: "$clientId",
  total: {
    $sum: "$price"
  },
  count: { $sum: 1 }
  }
  */

  //{ "date": {$gte: new Date('2022-03-1'), $lte: new Date('2022-08-31')}}
  //const docs = await features.query.explain();

  res.status(200).json({
    status: 'success',
    results: docs.length,
    data: docs,
  })
})
