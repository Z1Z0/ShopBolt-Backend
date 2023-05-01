const asyncHandler = require('express-async-handler')
const ApiError = require('../utilities/apiError')
const UserModel = require('../models/userModel')

// @desc    Adding a new product to wishlist
// @route   POST /api/v1/wishlist
// @access  Protected/User
exports.addProductToWishlist = asyncHandler(async (req, res, next) => {
    const user = await UserModel.findByIdAndUpdate(req.user._id,
        { $addToSet: { wishlist: req.body.productID } },
        { new: true }
    )

    res.status(200).json({ status: 'Success', message: 'Product added successfully to wishlist', data: user.wishlist })
})

// @desc    Get logged user wishlist
// @route   GET /api/v1/wishlist
// @access  Protected/User
exports.getLoggedUserWishlist = asyncHandler(async (req, res, next) => {
    const user = await UserModel.findById(req.user._id).populate('wishlist')

    res.status(200).json({ data: user.wishlist })
})

// @desc    Delete product from wishlist
// @route   DELETE /api/v1/wishlist
// @access  Protected/User
exports.removeProductFromWishlist = asyncHandler(async (req, res, next) => {
    const user = await UserModel.findByIdAndUpdate(req.user._id,
        { $pull: { wishlist: req.params.productID } },
        { new: true }
    )

    res.status(200).json({ status: 'Success', message: 'Product removed successfully from wishlist', data: user.wishlist })
})

