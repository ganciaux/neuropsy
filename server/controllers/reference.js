const Reference = require('../models/reference')
const factory = require('./handlerFactory')
const AppError = require('../utils/appError')

exports.getAllReferences = factory.getAll(Reference)
exports.getReference = factory.getOne(Reference)
exports.createReference = factory.createOne(Reference)
exports.updateReference = factory.updateOne(Reference)

exports.getYearReference = async (req, res, next) => {
  const doc = await Reference.find({
    model: req.params.model,
    field: req.params.field,
    year: req.params.year,
  })

  if (!doc) {
    return next(new AppError('No document found with this id', 404))
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  })
}

exports.updateYearReference = async (req, res, next) => {
  doc = await Reference.getNewReference(
    req.params.model,
    req.params.field,
    req.params.year,
  )
  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  })
}

//exports.updateReference = factory.updateOne(Reference);
//exports.deleteReference = factory.deleteOne(Reference);
