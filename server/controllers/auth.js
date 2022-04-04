const { promisify } = require('util')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
//const Email = require('../utils/email');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id)
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarder-proto'] === 'https',
  }

  //if (process.env.NODE_ENV === 'prod') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions)

  user.password = undefined

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  })
}

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
    role: req.body.role,
  })
  const url = `${req.protocol}://${req.get('host')}/me`
  //await new Email(newUser, url).sendWelcome();
  createSendToken(newUser, 201, req, res)
})

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = { ...req.body }

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400))
  }

  const user = await User.findOne({ email }).select('+password')

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401))
  }
  createSendToken(user, 200, req, res)
})

exports.protect = catchAsync(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt
  }

  if (!token) {
    return next(new AppError('You are not logged!', 401))
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

  const user = await User.findById(decoded.id)
  if (!user) {
    return next(new AppError('User does not exist', 401))
  }

  if (await user.changedPasswordAfter(decoded.iat))
    return next(new AppError('User recently change password', 401))

  req.user = user
  res.locals.user = user
  next()
})

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET,
      )
      const user = await User.findById(decoded.id)
      if (!user) {
        return next()
      }

      if (await user.changedPasswordAfter(decoded.iat)) return next()

      res.locals.user = user
      return next()
    } catch (err) {
      return next()
    }
  }
  next()
}

exports.logout = catchAsync(async (req, res, next) => {
  console.log('Logout...')
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  })
  res.status(200).json({ status: 'success' })
})

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    return next(new AppError('Email does not exist', 404))
  }

  const resetToken = user.createPasswordResetToken()

  await user.save({ validateBeforeSave: false })

  try {
    const resetURL = `${req.protocol}://${req.get(
      'host',
    )}/api/v1/users/resetPassword/${resetToken}`

    //await new Email(user, resetURL).sendPasswordReset();

    res.status(201).json({
      status: 'success',
      message: 'Token sent to email',
    })
  } catch (err) {
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save({ validateBeforeSave: false })

    return next(new AppError('Error can not send email', 500))
  }
})

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex')

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gte: Date.now() },
  })

  if (!user) {
    return next(new AppError('Token has expired or is invalid'))
  }

  user.passwordResetExpires = undefined
  user.passwordResetToken = undefined
  user.password = req.body.password
  user.passwordConfirm = req.body.passwordConfirm
  user.save()

  createSendToken(user, 200, req, res)
})

exports.restrictTo =
  (...role) =>
  (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return next(new AppError('No permission', 403))
    }
    next()
  }

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select('+password')
  if (!user) {
    return next(new AppError('User does not exist', 400))
  }

  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Incorrect current password', 401))
  }

  user.password = req.body.password
  user.passwordConfirm = req.body.passwordConfirm
  await user.save()

  createSendToken(user, 200, req, res)
})
