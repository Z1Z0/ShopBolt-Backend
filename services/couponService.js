const CouponModel = require('../models/couponModel')
const factory = require('./handlers/handlersFactory')

// @desc    Get list of coupons
// @route   GET /api/v1/coupons
// @access  Private/Admin-Manager
exports.getCoupons = factory.getAll(CouponModel)

// @desc    Get a specific coupon by id
// @route   GET /api/v1/coupons/:id
// @access  Private/Admin-Manager
exports.getCoupon = factory.getOne(CouponModel)

// @desc    Create coupon
// @route   POST /api/v1/coupons
// @access  Private/Admin-Manager
exports.createCoupon = factory.createOne(CouponModel)

// @desc    Update a specific coupon
// @route   PUT /api/v1/coupons/:id
// @access  Private/Admin-Manager
exports.updateCoupon = factory.updateOne(CouponModel)

// @desc    Delete a specific coupon
// @route   DELETE /api/v1/coupons/:id
// @access  Private/Admin-Manager
exports.deleteCoupon = factory.deleteOne(CouponModel)