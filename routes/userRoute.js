const express = require('express')

const router = express.Router()

const { getUsers, getUser, createUser, updateUser, deleteUser, uploadUserImage, resizeImage } = require('../services/userService')

// const { getBrandMiddleware, createBrandValidator, updateBrandMiddleware, deleteBrandMiddleware } = require('../utilities/validators/brandValidator')

router.route('/').get(getUsers).post(uploadBrandImage, resizeImage, createUser)
router.route('/:id').get(getUser).put(uploadBrandImage, resizeImage, updateUser).delete(deleteUser)

module.exports = router