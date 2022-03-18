const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
const { isEmail } = require('validator')
const utils = require('../utils/utils')
const Payment = require('./payment')
const Session = require('./session')
const Order = require('./order')

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
  let address = ''
  if (this.address != undefined) address += this.address
  if (this.zip != undefined) {
    if (address.length > 0) {
      address += ' '
    }
    address += this.zip
  }
  if (this.city != undefined) {
    if (address.length > 0) {
      address += ' '
    }
    address += this.city
  }
  return address
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

clientSchema.virtual('orders', {
  ref: 'Order',
  localField: '_id',
  foreignField: 'clientId',
})

clientSchema.virtual('payments', {
  ref: 'Payment',
  localField: '_id',
  foreignField: 'clientId',
})

clientSchema.virtual('sessions', {
  ref: 'Session',
  localField: '_id',
  foreignField: 'clientId',
})

const ClientModel = mongoose.model('Client', clientSchema)

module.exports = ClientModel
