const Session = require('../models/session')
const factory = require('./handlerFactory')

exports.getAllSessions = factory.getAll(Session, {
  path: 'clientId',
})
exports.getSession = factory.getOne(Session)
exports.createSession = factory.createOne(Session)
exports.updateSession = factory.updateOne(Session)
exports.deleteSession = factory.deleteOne(Session)
