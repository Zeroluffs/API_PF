  
const express = require('express')
const router = express.Router()

const user = require('../controllers/user.controller')

router.get('/', user.getUsers)
router.post('/', user.createUser)
router.post('/login', user.logIn)

module.exports = router