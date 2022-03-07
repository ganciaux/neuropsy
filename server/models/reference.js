const mongoose = require('mongoose')
const utils = require('../utils/utils')

const ReferenceSchema = new mongoose.Schema(
  {
    model: {
      type: String,
      required: true,
    },
    field: {
      type: String,
    },
    year: {
      type: Number,
      default: 0,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value',
      },
    },
    count: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

ReferenceSchema.index({ model: 1, field: 1, year: 1 }, { unique: true })

ReferenceSchema.statics.getNewReference = async function getNewReference(
  model,
  field,
  year,
) {
  const doc = await this.findOneAndUpdate(
    { model, field, year },
    { $inc: { count: 1 } },
    { upsert: true, new: true },
  ).select('model field count -_id')
  return doc
}

const Reference = mongoose.model('Reference', ReferenceSchema)

module.exports = Reference
