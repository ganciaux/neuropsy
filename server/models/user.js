const crypto = require('crypto')
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'User must have a name'],
      trim: true,
      maxlength: [40, 'Max length 40'],
      minLength: [5, 'Min length 5'],
    },
    email: {
      type: String,
      required: [true, 'User must have a email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'User must a valide email'],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    password: {
      type: String,
      required: [true, 'A User must have a password'],
      maxlength: [40, 'Max length 40'],
      minLength: [8, 'Min length 8'],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'A User must have a password confirmation'],
      validate: {
        //ONLY ON CREATE AND SAVE
        validator: function (val) {
          return this.password === this.passwordConfirm
        },
        message: 'Password are not the same',
      },
    },
    passwordChangedAt: {
      type: Date,
    },
    passwordResetToken: {
      type: String,
      select: false,
    },
    passwordResetExpires: {
      type: Date,
      select: false,
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    //id: false
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  this.password = await bcrypt.hash(this.password, 12)
  this.passwordConfirm = undefined

  next()
})

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next()
  this.passwordChangedAt = Date.now() - 1000
  next()
})

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } })
  next()
})

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.changedPasswordAfter = async function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    )
    if (changedTimestamp > JWTTimestamp) {
      return true
    }
  }
  return false
}

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex')
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000

  return resetToken
}

const User = mongoose.model('User', userSchema)

module.exports = User
