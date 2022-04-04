const express = require('express')
const user = require('../controllers/user')
const auth = require('../controllers/auth')

const router = express.Router()

router.post('/signup', auth.signup)
router.post('/login', auth.login)
router.get('/logout', auth.logout)
router.get('/isLoggedIn', auth.isLoggedIn, user.getMeLocal, user.getUser)
router.post('/forgotPassword', auth.forgotPassword)
router.patch('/resetPassword/:token', auth.resetPassword)

//All next route are protected
router.use(auth.protect)

router.patch('/updateMyPassword', auth.updatePassword)
router.patch('/updateMe', user.updateMe)
router.delete('/deleteMe', user.deleteMe)
router.get('/me', user.getMe, user.getUser)

router.use(auth.restrictTo('admin'))

router.route('/').get(user.getAllUsers).post(user.createUser)

router
  .route('/:id')
  .get(user.getUser)
  .patch(user.updateUser)
  .delete(user.deleteUser)

module.exports = router
