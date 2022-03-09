const mongoose = require('mongoose')
const Client = require('./client')
const utils = require('../utils/utils')
const Reference = require('./reference')

const paymentSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Client',
      required: [true, 'Payment must belong to a client'],
    },
    type: {
      type: Number,
      default: 0,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value',
      },
    },
    status: {
      type: Number,
      default: 0,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value',
      },
    },
    price: {
      type: Number,
      default: 0.0,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

paymentSchema.virtual('_date').get(function () {
  if (this.date) return utils.formatDate(this.date)
  else {
    return ''
  }
})

paymentSchema.pre('save', async function (next) {
  const doc = await Reference.getNewReference(
    'payment',
    'refId',
    this.date.getFullYear(),
  )
  this.ref = utils.getReference(this.date, doc.count, 'payment-')
  next()
})

const Payment = mongoose.model('Payment', paymentSchema)

module.exports = Payment
