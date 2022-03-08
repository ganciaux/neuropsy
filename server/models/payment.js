const mongoose = require('mongoose')
const Client = require('./client')
const utils = require('../utils/utils')
const slug = require('mongoose-slug-updater')

const paymentSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      slug: 'type',
      unique: true,
      slugPaddingSize: 3,
      transform: (v) => {
        return 'payment'
      },
    },
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

paymentSchema.virtual('_date').get(function () {
  if (this.date) {
    return utils.formatDate(this.date)
  } else {
    return ''
  }
})

const Payment = mongoose.model('Payment', paymentSchema)

module.exports = Payment
