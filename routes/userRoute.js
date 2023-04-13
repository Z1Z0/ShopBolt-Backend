const express = require('express')

const router = express.Router()

const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    changeUserPassword,
    deleteUser,
    uploadUserImage,
    resizeImage
} = require('../services/userService')

const {
    createUserValidator,
    getUserValidator,
    updateUserValidator,
    changeUserPasswordValidator,
    deleteUserValidator
} = require('../utilities/validators/userValidator')

router.route('/')
    .get(getUsers)
    .post(uploadUserImage, resizeImage, createUserValidator, createUser)

router.route('/:id')
    .get(getUserValidator, getUser)
    .put(uploadUserImage, resizeImage, updateUserValidator, updateUser)
    .delete(deleteUserValidator, deleteUser)

router.route('/changePassword/:id')
    .put(changeUserPasswordValidator, changeUserPassword)

module.exports = router