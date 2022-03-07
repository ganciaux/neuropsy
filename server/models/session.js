const mongoose = require('mongoose')
const Client = require('./client')
const Order = require('./order')

const sessionSchema = new mongoose.Schema(
  {
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
  },
)

const Session = mongoose.model('Session', sessionSchema)

module.exports = Session
