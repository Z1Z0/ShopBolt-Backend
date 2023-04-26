const express = require('express')

const router = express.Router()

const authService = require('../services/authService')

const {
    getBrands,
    getBrand,
    createBrand,
    updateBrand,
    deleteBrand,
    uploadBrandImage,
    resizeImage
} = require('../services/brandService')

const {
    getBrandValidator,
    createBrandValidator,
    updateBrandValidator,
    deleteBrandValidator
} = require('../utilities/validators/brandValidator')

router.route('/')
    .get(
        getBrands
    )
    .post(
        authService.authorizationSecurity,
        // authService.allowedTo('manager', 'admin'),
        uploadBrandImage,
        resizeImage,
        createBrandValidator,
        createBrand
    )

router.route('/:id')
    .get(
        getBrandValidator,
        getBrand
    )
    .put(
        authService.authorizationSecurity,
        // authService.allowedTo('manager', 'admin'),
        uploadBrandImage,
        resizeImage,
        updateBrandValidator,
        updateBrand
    )
    .delete(
        authService.authorizationSecurity,
        // authService.allowedTo('admin'),
        deleteBrandValidator,
        deleteBrand
    )

module.exports = router