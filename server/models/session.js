const mongoose = require('mongoose')
const Client = require('./client')
const Order = require('./order')
const Reference = require('./reference')
const utils = require('../utils/utils')

const sessionSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      trim: true,
      unique: true,
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
    return utils.formatTime(this.date)
  } else {
    return ''
  }
})

sessionSchema.pre('save', async function (next) {
  const doc = await Reference.getNewReference(
    'session',
    'refId',
    this.date.getFullYear(),
  )
  this.slug = utils.getReference(this.date, doc.count, 'session-', false)
  next()
})

const Session = mongoose.model('Session', sessionSchema)

module.exports = Session
