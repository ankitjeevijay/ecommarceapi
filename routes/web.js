const express = require('express')
const UserController = require('../controllers/UserController')
const Admin_auth = require('../middleware/auth')
const router = express.Router()

// frontController
router.post('/register',UserController.Register)
router.post('/verifyLogin', UserController.VerifyLogin)
router.get('/logout', UserController.Logout)
router.get('/allUser',Admin_auth,UserController.GetAllUser)
router.get('/profile',Admin_auth,UserController.Profile)
router.post('/changePassword', Admin_auth,UserController.ChangePassword)




module.exports = router