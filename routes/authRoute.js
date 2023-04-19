const express = require('express')

const router = express.Router()

const {
    signup,
    signin
} = require('../services/authService')

const {
    forgetPassword,
    verifyPasswordResetCode,
    resetPassword
} = require('../services/forgetPasswordService')

const {
    signupValidator,
    signinValidator,

} = require('../utilities/validators/authValidator')



router.route('/signup')
    .post(signupValidator, signup)

router.route('/signin')
    .post(signinValidator, signin)

router.route('/forgetPassword')
    .post(forgetPassword)

router.route('/verifyResetCode')
    .post(verifyPasswordResetCode)

router.route('/resetPassword')
    .put(resetPassword)

module.exports = router