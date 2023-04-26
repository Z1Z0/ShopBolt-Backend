const express = require('express')

const router = express.Router()

const authService = require('../services/authService')

const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    changeUserPassword,
    deleteUser,
    uploadUserImage,
    resizeImage,
    getLoggedUserData
} = require('../services/userService')

const {
    createUserValidator,
    getUserValidator,
    updateUserValidator,
    changeUserPasswordValidator,
    deleteUserValidator
} = require('../utilities/validators/userValidator')

router.route('/')
    .get(
        authService.authorizationSecurity,
        authService.allowedTo('admin', 'manager'),
        getUsers
    )
    .post(
        authService.authorizationSecurity,
        authService.allowedTo('manager', 'admin'),
        uploadUserImage,
        resizeImage,
        createUserValidator,
        createUser
    )

router.route('/userInfo')
    .get(authService.authorizationSecurity, getLoggedUserData, getUser)

router.route('/:id')
    .get(
        getUserValidator,
        getUser
    )
    .put(
        authService.authorizationSecurity,
        authService.allowedTo('admin'),
        uploadUserImage,
        resizeImage,
        updateUserValidator,
        updateUser
    )
    .delete(
        authService.authorizationSecurity,
        authService.allowedTo('admin'),
        deleteUserValidator,
        deleteUser
    )

router.route('/changePassword/:id')
    .put(changeUserPasswordValidator, changeUserPassword)

module.exports = router