const mongoose = require('mongoose')
const Article = require('./article')
const Client = require('./client')
const Reference = require('./reference')
const utils = require('../utils/utils')
const slug = require('mongoose-slug-updater')

const orderSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Client',
      required: [true, 'Order must belong to a client'],
    },
    parentId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Order',
    },
    status: {
      type: Number,
      default: 0,
      required: true,
    },
    refId: {
      type: Number,
      default: 0,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value',
      },
    },
    slug: {
      type: String,
      slug: 'refId',
      unique: true,
      slugPaddingSize: 3,
    },
    ref: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    description: {
      type: String,
      trim: true,
    },
    sessions: {
      type: Number,
      default: 0.0,
      required: [true, 'A Order must have a session number'],
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
    articles: [
      {
        articleId: {
          type: mongoose.Schema.ObjectId,
          ref: 'Article',
          null: true,
          transform: (v) => {
            return v ? v : '-1'
          },
        },
        quantity: {
          type: Number,
          default: 0,
          required: true,
          validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value',
          },
        },
        unitCost: {
          type: Number,
          default: 0.0,
          required: true,
        },
        price: {
          type: Number,
          default: 0.0,
          required: true,
        },
        description: {
          type: String,
          default: '',
          trim: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

orderSchema.pre('save', async function (next) {
  const doc = await Reference.getNewReference(
    'order',
    'refId',
    this.date.getFullYear(),
  )
  this.refId = doc.count
  this.ref = utils.getReference(this.date, doc.count)
  this.price = utils.getArticlesPrice(this.articles)
  next()
})

orderSchema.pre('findOneAndUpdate', function (next) {
  this._update.price = utils.getArticlesPrice(this._update.articles)
  next()
})

orderSchema.virtual('_date').get(function () {
  if (this.date) return utils.formatDate(this.date)
  else {
    return ''
  }
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order
