const express = require('express')

const router = express.Router()

const {
    signup
} = require('../services/authService')

const {
    signupValidator
} = require('../utilities/validators/authValidator')

router.route('/signup')
    .post(signupValidator, signup)

module.exports = router