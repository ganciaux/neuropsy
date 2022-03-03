const Client = require('../models/client');
const factory = require('./handlerFactory');

exports.getAllClients = factory.getAll(Client);
exports.getClient = factory.getOne(Client);
exports.createClient = factory.createOne(Client);
exports.updateClient = factory.updateOne(Client);
exports.deleteClient = factory.deleteOne(Client);