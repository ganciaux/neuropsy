const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')

mongoose.plugin(slug)

const articleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    label: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      slug: 'name',
      unique: true,
      slugPaddingSize: 3,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      default: 0.0,
    },
    sessions: {
      type: Number,
      default: 0,
      required: [true, 'An article must have a session number'],
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value',
      },
    },
  },
  {
    timestamps: true,
  },
)

const Article = mongoose.model('Article', articleSchema)

module.exports = Article
