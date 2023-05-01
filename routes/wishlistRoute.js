const express = require('express')

const router = express.Router()

const { authorizationSecurity, allowedTo } = require('../services/authService')

const {
    addProductToWishlist,
    getLoggedUserWishlist,
    removeProductFromWishlist
} = require('../services/wishlistService')

router.use(authorizationSecurity, allowedTo('user'))

router.route('/')
    .post(addProductToWishlist)
    .get(getLoggedUserWishlist)

router.route('/:productID')
    .delete(removeProductFromWishlist)

module.exports = router