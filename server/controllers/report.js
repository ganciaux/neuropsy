const Client = require('../models/client')
const Payment = require('../models/payment')
const catchAsync = require('../utils/catchAsync')
var ObjectId = require('mongoose').Types.ObjectId
const APIFeatures = require('../utils/apiFeatures')

const getDays = (y, m) => new Date(y, m, 0).getDate()

const getDate = (data) => {
  let dates = {}
  if (data.type === '1') {
    const from = `${data.year}-${(data.period - 1) * 3 + 1}-1`
    const to = `${data.year}-${data.period * 3}-${getDays(
      data.year,
      data.period * 3,
    )}`
    dates['$gte'] = new Date(from)
    dates['$lte'] = new Date(to)
  } else if (data.type === '2') {
    dates = { ...data.date }
  }
  return dates
}

exports.getAllReport = catchAsync(async (req, res, next) => {
  console.log('getAllReport:', req.query)
  const { gte, lte } = getDate(req.query)
  const docs = await Payment.aggregate([
    {
      $match: { type: 3 },
    },
    {
      $group: {
        _id: '$clientId',
        total: { $sum: '$price' },
        sum: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: 'clients',
        localField: '_id',
        foreignField: '_id',
        as: 'client',
      },
    },
    {
      $unwind: '$client',
    },
    {
      $project: {
        count: '$sum',
        total: '$total',
        name: '$client.name',
        firstname: '$client.firstname',
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
