const express = require('express')

const router = express.Router()

const { authorizationSecurity, allowedTo } = require('../services/authService')

const {
    addProductToCart,
    getLoggedUserCart,
    updateCartItemQuantity,
    removeSpecificCartItem,
    clearCart,
    applyCoupon
} = require('../services/cartService')

// const {

// } = require('../utilities/validators/brandValidator')

router.use(authorizationSecurity, allowedTo('user'))

router.route('/')
    .post(addProductToCart)
    .get(getLoggedUserCart)
    .delete(clearCart)

router.route('/applyCoupon')
    .put(applyCoupon)

router.route('/:itemID')
    .delete(removeSpecificCartItem)
    .put(updateCartItemQuantity)



module.exports = router