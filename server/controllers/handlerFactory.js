const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const APIFeatures = require('../utils/apiFeatures')
var ObjectId = require('mongoose').Types.ObjectId

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id)
    if (!doc) {
      return next(new AppError('No document found with this id', 404))
    }
    res.status(204).json({
      status: 'success',
      data: null,
    })
  })

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!doc) {
      return next(new AppError('No document found with this id', 404))
    }
    res.status(200).json({
      status: 'success',
      data: doc,
    })
  })

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body)
    res.status(201).json({
      status: 'success',
      data: newDoc,
    })
  })

exports.getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let doc = null
    if (ObjectId.isValid(req.params.id) == true) {
      query = Model.findById(req.params.id)
      if (populateOptions) query = query.populate(populateOptions)
      doc = await query
    }

    if (!doc) {
      query = Model.findOne({ slug: req.params.id })
      if (populateOptions) query = query.populate(populateOptions)
      doc = await query
    }

    if (!doc) {
      return next(new AppError('No document found with this id', 404))
    }
    if (doc.length === 0) {
      return next(new AppError('No document found with this slug', 404))
    }

    if (Array.isArray(doc)) doc = doc[0]

    res.status(200).json({
      status: 'success',
      data: doc,
    })
  })

exports.getAll = (Model, populateOptions, selected) =>
  catchAsync(async (req, res, next) => {
    let filter = {}
    //SPECIFIC PARAMS
    if (req.params.clientId) filter = { client: req.params.clientId }
    //EXECUTE QUERY
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .pagination()

    if (populateOptions)
      query = features.query.populate(populateOptions).select(selected)
    else query = features.query

    const docs = await query
    //const docs = await features.query.explain();

    //SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: docs.length,
      data: docs,
    })
  })
