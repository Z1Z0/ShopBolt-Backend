const express = require('express')

const router = express.Router()

const { authorizationSecurity, allowedTo } = require('../services/authService')

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
        authorizationSecurity,
        allowedTo('admin', 'manager'),
        getUsers
    )
    .post(
        authorizationSecurity,
        allowedTo('manager', 'admin'),
        uploadUserImage,
        resizeImage,
        createUserValidator,
        createUser
    )

router.route('/userInfo')
    .get(authorizationSecurity, getLoggedUserData, getUser)

router.route('/:id')
    .get(
        getUserValidator,
        getUser
    )
    .put(
        authorizationSecurity,
        allowedTo('admin'),
        uploadUserImage,
        resizeImage,
        updateUserValidator,
        updateUser
    )
    .delete(
        authorizationSecurity,
        allowedTo('admin'),
        deleteUserValidator,
        deleteUser
    )

router.route('/changePassword/:id')
    .put(changeUserPasswordValidator, changeUserPassword)

module.exports = router