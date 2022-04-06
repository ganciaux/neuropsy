const express = require('express')
const report = require('../controllers/report')
const router = express.Router()

//article
router.get('/', report.getAllReport)

module.exports = router
