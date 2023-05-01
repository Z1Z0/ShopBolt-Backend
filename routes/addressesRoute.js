const express = require('express')

const router = express.Router()

const { authorizationSecurity, allowedTo } = require('../services/authService')

const {
    addAddress,
    getLoggedUserAddresses,
    updateLoggedUserAddress,
    removeAddress
} = require('../services/addressesService')

router.use(authorizationSecurity, allowedTo('user'))

router.route('/')
    .post(addAddress)
    .get(getLoggedUserAddresses)

router.route('/:addressID')
    .put(updateLoggedUserAddress)
    .delete(removeAddress)

module.exports = router