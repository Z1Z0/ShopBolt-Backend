const express = require('express')

const router = express.Router()

const { getUsers, getUser, createUser, updateUser, changeUserPassword, deleteUser, uploadUserImage, resizeImage } = require('../services/userService')

const { createUserValidator, getUserMiddleware, updateUserMiddleware, deleteUserMiddleware } = require('../utilities/validators/userValidator')

router.route('/').get(getUsers).post(uploadUserImage, resizeImage, createUserValidator, createUser)
router.route('/:id').get(getUserMiddleware, getUser).put(uploadUserImage, resizeImage, updateUserMiddleware, updateUser).delete(deleteUserMiddleware, deleteUser)
router.route('/changePassword/:id').put(changeUserPassword)
module.exports = router