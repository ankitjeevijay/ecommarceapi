const express = require('express')
const FrontController = require('../controllers/FrontController')
const router = express.Router()

// frontController
router.post('/register',FrontController.Register)




module.exports = router