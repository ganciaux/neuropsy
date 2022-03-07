const express = require('express')
const session = require('../controllers/session')
const router = express.Router()

//session
router.get('/', session.getAllSessions)
router.get('/:id', session.getSession)
router.post('/', session.createSession)
router.put('/:id', session.updateSession)
router.delete('/:id', session.deleteSession)

module.exports = router
