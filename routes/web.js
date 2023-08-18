const express = require('express')
const UserController = require('../controllers/UserController')
const router = express.Router()

// frontController
router.post('/register',UserController.Register)
router.get('/allUser', UserController.GetAllUser)




module.exports = router