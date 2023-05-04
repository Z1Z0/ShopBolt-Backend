const express = require('express')

const router = express.Router()

const { authorizationSecurity, allowedTo } = require('../services/authService')

const {
    getCoupon,
    getCoupons,
    createCoupon,
    updateCoupon,
    deleteCoupon
} = require('../services/couponService')

router.use(authorizationSecurity, allowedTo('manager', 'admin'))

router.route('/')
    .get(getCoupons)
    .post(createCoupon)

router.route('/:id')
    .get(getCoupon)
    .put(updateCoupon)
    .delete(deleteCoupon)

module.exports = router