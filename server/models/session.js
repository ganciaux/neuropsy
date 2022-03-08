const mongoose = require('mongoose')
const Client = require('./client')
const Order = require('./order')
const slug = require('mongoose-slug-updater')
const utils = require('../utils/utils')

const sessionSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      slug: 'type',
      unique: true,
      slugPaddingSize: 3,
      transform: (v) => {
        return 'session'
      },
    },
    clientId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Client',
      required: [true, 'Session must belong to a client'],
    },
    orderId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Order',
    },
    type: {
      type: Number,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value',
      },
    },
    status: {
      type: Number,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value',
      },
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

sessionSchema.virtual('_date').get(function () {
  if (this.date) {
    return utils.formatDate(this.date)
  } else {
    return ''
  }
})

const Session = mongoose.model('Session', sessionSchema)

module.exports = Session
