const asyncHandler = require('express-async-handler')
const CartModel = require('../models/cartModel')
const ProductModel = require('../models/productModel')
const CouponModel = require('../models/couponModel')
const ApiError = require('../utilities/apiError')

const calculateTotalCartPrice = (cart) => {
    let totalPrice = 0

    cart.cartItems.forEach((item) => {
        totalPrice += item.quantity * item.price
    })

    cart.totalCartPrice = totalPrice
    cart.totalPriceAfterDiscount = undefined
    return totalPrice
}

exports.addProductToCart = asyncHandler(async (req, res, next) => {
    const { productID, color } = req.body

    const product = await ProductModel.findById(productID)

    //Get cart for logged user
    let cart = await CartModel.findOne({ user: req.user._id })

    if (!cart) {
        //Create cart for logged user with product
        cart = await CartModel.create({
            user: req.user._id,
            cartItems: [{
                product: productID,
                color,
                price: product.price
            }]
        })
    } else {
        // If product exist in cart, update product quantity
        const productIndex = cart.cartItems.findIndex((item) => item.product.toString() === productID && item.color === color)

        if (productIndex > -1) {
            const cartItem = cart.cartItems[productIndex]
            cartItem.quantity += 1

            cart.cartItems[productIndex] = cartItem
        } else {
            // if product doesn't exist in cart, push product to cartItems array
            cart.cartItems.push({ product: productID, color, price: product.price })
        }
    }

    calculateTotalCartPrice(cart)

    await cart.save()

    res.status(200).json({ status: 'success', items: cart.cartItems.length, message: 'Item added successfully to cart', data: cart })

})

exports.getLoggedUserCart = asyncHandler(async (req, res, next) => {
    const cart = await CartModel.findOne({ user: req.user._id })

    if (!cart) {
        return next(new ApiError(`There is no cart of this user ${req.user._id}`, 404))
    }

    res.status(200).json({ items: cart.cartItems.length, data: cart })
})

exports.updateCartItemQuantity = asyncHandler(async (req, res, next) => {
    const { quantity } = req.body
    const cart = await CartModel.findOne({ user: req.user._id })

    if (!cart) {
        return next(new ApiError(`There is no cart for this user ${req.user._id}`, 404))
    }

    const itemIndex = cart.cartItems.findIndex((item) => item._id.toString() === req.params.itemID)

    if (itemIndex > -1) {
        const cartItem = cart.cartItems[itemIndex]
        cartItem.quantity = quantity
        cart.cartItems[itemIndex] = cartItem
    } else {
        return next(new ApiError(`There is no item for this ID ${req.params.itemID}`, 404))
    }

    calculateTotalCartPrice(cart)

    await cart.save()

    res.status(200).json({ status: 'success', items: cart.cartItems.length, data: cart })
})

exports.removeSpecificCartItem = asyncHandler(async (req, res, next) => {
    const cart = await CartModel.findOneAndUpdate({ user: req.user._id },
        {
            $pull: { cartItems: { _id: req.params.itemID } }
        },
        {
            new: true
        }
    )

    calculateTotalCartPrice(cart)

    cart.save()

    res.status(200).json({ status: 'success', items: cart.cartItems.length, data: cart })
})

exports.clearCart = asyncHandler(async (req, res, next) => {
    await CartModel.findOneAndDelete({ user: req.user._id })
    res.status(204).json()
})

exports.applyCoupon = asyncHandler(async (req, res, next) => {
    const coupon = await CouponModel.findOne({ name: req.body.coupon, expire: { $gt: Date.now() } })

    if (!coupon) {
        return next(new ApiError('Coupon expired or invalid', 404))
    }

    const cart = await CartModel.findOne({ user: req.user._id })

    const totalPrice = cart.totalCartPrice

    const totalPriceAfterDiscount = (totalPrice - (totalPrice * coupon.discount) / 100).toFixed(2)

    cart.totalPriceAfterDiscount = totalPriceAfterDiscount

    await cart.save()

    res.status(200).json({ status: 'success', items: cart.cartItems.length, data: cart })
})