const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
const { isEmail } = require('validator')
const utils = require('../utils/utils')
const Payment = require('./payment')

mongoose.plugin(slug)

const clientSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      slug: ['name', 'firstname'],
      unique: true,
      slugPaddingSize: 3,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: Number,
      default: 0,
    },
    phone: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      validate: {
        validator: (value) => {
          if (value === '') {
            return true
          }
          return isEmail(value)
        },
      },
      lowercase: true,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    zip: {
      type: String,
      trim: true,
    },
    birthdate: {
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

clientSchema.virtual('_name').get(function () {
  return `${this.name} ${this.firstname}`
})

clientSchema.virtual('_address').get(function () {
  return `${this.address} ${this.zip} ${this.city}`
})

clientSchema.virtual('_birthdate').get(function () {
  if (this.birthdate) {
    return utils.formatDate(this.birthdate)
  } else {
    return ''
  }
})

clientSchema.virtual('_age').get(function () {
  if (this.birthdate) {
    return utils.getAge(this.birthdate)
  } else {
    return ''
  }
})

/*
clientSchema.virtual('_payments').get(async function () {
  const payments = this.constructor.payments(this.id)
  return payments
})

clientSchema.statics.payments = async function (clientId) {
  const payments = await Payment.findOne({ clientId: clientId })
  console.log('statics:', clientId)
  console.log(payments)
  return payments
}
*/
clientSchema.virtual('orders', {
  ref: 'Order',
  localField: 'clientId',
  foreignField: '_id',
})

clientSchema.virtual('payments', {
  ref: 'Payment',
  localField: 'clientId',
  foreignField: '_id',
})

clientSchema.virtual('sessions', {
  ref: 'Session',
  localField: 'clientId',
  foreignField: '_id',
})

const ClientModel = mongoose.model('Client', clientSchema)

module.exports = ClientModel
