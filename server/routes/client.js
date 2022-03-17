const express = require('express')
const clientController = require('../controllers/client')
const router = express.Router()

//client
router.get('/', clientController.getAllClients)
router.get('/:id', clientController.getClient)
router.post('/', clientController.createClient)
router.put('/:id', clientController.updateClient)
router.delete('/:id', clientController.deleteClient)
router.get('/details/:id', clientController.detailsClient)

module.exports = router
