const dotenv = require('dotenv')
dotenv.config({ path: 'config.env' })
// const stripe = require('stripe')('sk_test_51N5p0KKDCzidcwS0jZLX4b9ENoETrucsleDILqYj6wpVJbhHiz5kGf5XLU9BPbaiPOo8FN8wmVpBmFDp9Cz5alpM00NGpzaSBK')
const asyncHandler = require('express-async-handler')
const ApiError = require('../utilities/apiError')
const factory = require('./handlers/handlersFactory')
const OrderModel = require('../models/orderModel')
const CartModel = require('../models/cartModel')
const ProductModel = require('../models/productModel')
const stripe = require('../utilities/stripe')

exports.createCashOrder = asyncHandler(async (req, res, next) => {
    const taxPrice = 0
    const shippingPrice = 0

    const cart = await CartModel.findById(req.params.cartID)

    if (!cart) {
        return next(new ApiError(`There is no cart for this ID: ${req.params.cartID}`, 404))
    }

    const cartPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalCartPrice

    const totalOrderPrice = cartPrice + taxPrice + shippingPrice

    const order = await OrderModel.create({
        user: req.user._id,
        cartItems: cart.cartItems,
        shippingAddress: req.body.shippingAddress,
        totalOrderPrice
    })

    if (order) {
        const bulkOptions = cart.cartItems.map((item) => ({
            updateOne: {
                filter: { _id: item.product },
                update: { $inc: { quantity: -item.quantity, sold: +item.quantity } }
            }
        }))

        await ProductModel.bulkWrite(bulkOptions, {})

        await CartModel.findByIdAndDelete(req.params.cartID)
    }

    res.status(201).json({ status: 'success', data: order })
})

exports.filterOrderForLoggedUser = asyncHandler(async (req, res, next) => {
    if (req.user.role === 'user') req.filterObj = { user: req.user._id }
    next()
})

exports.getAllOrders = factory.getAll(OrderModel)

exports.getSpecificOrder = factory.getOne(OrderModel)

exports.updateOrderToPaid = asyncHandler(async (req, res, next) => {
    const order = await OrderModel.findById(req.params.orderID)

    if (!order) {
        return next(new ApiError(`There is no order with this ID ${req.params.orderID}`, 404))
    }

    order.isPaid = true
    order.paidAt = Date.now()

    const updatedOrder = await order.save()

    res.status(200).json({ status: 'Success', data: updatedOrder })
})

exports.updateOrderToDelivered = asyncHandler(async (req, res, next) => {
    const order = await OrderModel.findById(req.params.orderID)

    if (!order) {
        return next(new ApiError(`There is no order with this ID ${req.params.orderID}`, 404))
    }

    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()

    res.status(200).json({ status: 'Success', data: updatedOrder })
})



exports.checkoutSession = asyncHandler(async (req, res, next) => {

    const cart = await CartModel.findById(req.params.cartID)

    if (!cart) {
        return next(new ApiError(`There is no cart for this ID ${req.params.cartID}`, 404))
    }

    // const cartPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalCartPrice

    const session = await stripe.createCheckoutSession(cart.cartItems, req)

    res.status(200).json({ status: 'success', session })
})