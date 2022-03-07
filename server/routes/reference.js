const express = require('express')
const reference = require('../controllers/reference')
const router = express.Router()

//Reference
router.get('/', reference.getAllReferences)
router.get('/:id', reference.getReference)
router.get('/:model/:field/:year', reference.getYearReference)
router.post('/', reference.createReference)
router.put('/:model/:field/:year', reference.updateYearReference)

module.exports = router
