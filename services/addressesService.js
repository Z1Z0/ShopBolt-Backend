const asyncHandler = require('express-async-handler')
const UserModel = require('../models/userModel')

// @desc    Adding a new address to user addresses list
// @route   POST /api/v1/addresses
// @access  Protected/User
exports.addAddress = asyncHandler(async (req, res, next) => {
    const user = await UserModel.findByIdAndUpdate(req.user._id,
        { $addToSet: { addresses: req.body } },
        { new: true }
    )

    res.status(200).json({ status: 'Success', message: 'Address added successfully to address list', data: user.addresses })
})

// @desc    Get logged user addresses
// @route   GET /api/v1/addresses
// @access  Protected/User
exports.getLoggedUserAddresses = asyncHandler(async (req, res, next) => {
    const user = await UserModel.findById(req.user._id).populate('addresses')

    res.status(200).json({ data: user.addresses })
})

// @desc    Edit logged user addresses
// @route   PUT /api/v1/addresses/:addressID
// @access  Protected/User
exports.updateLoggedUserAddress = asyncHandler(async (req, res, next) => {
    await UserModel.updateOne(
        { _id: req.user._id, 'addresses._id': req.params.addressID },
        {
            $set: {
                'addresses.$.alias': req.body.alias,
                'addresses.$.details': req.body.details,
                'addresses.$.phone': req.body.phone,
                'addresses.$.city': req.body.city,
                'addresses.$.postalCode': req.body.postalCode
            }
        }, { new: true }
    )
    res.status(200).json({ status: 'Success', message: 'Address edited successfully' })
})

// @desc    Delete address from user addresses list
// @route   DELETE /api/v1/addresses/:addressID
// @access  Protected/User
exports.removeAddress = asyncHandler(async (req, res, next) => {
    const user = await UserModel.findByIdAndUpdate(req.user._id,
        { $pull: { addresses: { _id: req.params.addressID } } },
        { new: true }
    )

    res.status(200).json({ status: 'Success', message: 'Address removed successfully from address list', data: user.addresses })
})

