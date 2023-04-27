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
    getLoggedUserData,
    changeLoggedUserPassword,
    changeLoggedUserData,
    deleteLoggedUser
} = require('../services/userService')

const {
    createUserValidator,
    getUserValidator,
    updateUserValidator,
    changeUserPasswordValidator,
    changeLoggedUserPasswordValidator,
    changeLoggedUserDataValidator,
    deleteUserValidator
} = require('../utilities/validators/userValidator')

router.use(authorizationSecurity)

router.route('/getLoggedUserInfo')
    .get(getLoggedUserData, getUser)

router.route('/changeLoggedUserPassword')
    .put(changeLoggedUserPasswordValidator, changeLoggedUserPassword)

router.route('/changeLoggedUserData')
    .put(changeLoggedUserDataValidator, changeLoggedUserData)

router.route('/deleteLoggedUser')
    .delete(authorizationSecurity, deleteLoggedUser)

router.use(allowedTo('admin'))

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