const express = require('express')

const router = express.Router()

const { authorizationSecurity, allowedTo } = require('../services/authService')

const { createCashOrder, getAllOrders, getSpecificOrder, filterOrderForLoggedUser, updateOrderToPaid, updateOrderToDelivered, checkoutSession } = require('../services/orderService')

router.use(authorizationSecurity)

router.get(
    '/checkout-session/:cartID',
    allowedTo('user'),
    checkoutSession
)

router.route('/:cartID')
    .post(allowedTo('user'), createCashOrder)

router.route('/')
    .get(allowedTo('user', 'manager', 'admin'), filterOrderForLoggedUser, getAllOrders)

router.route('/:id')
    .get(allowedTo('user', 'manager', 'admin'), filterOrderForLoggedUser, getSpecificOrder)

router.route('/:orderID/pay')
    .put(allowedTo('manager', 'admin'), updateOrderToPaid)

router.route('/:orderID/deliver')
    .put(allowedTo('manager', 'admin'), updateOrderToDelivered)

module.exports = router