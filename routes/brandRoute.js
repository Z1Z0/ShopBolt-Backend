const express = require('express')

const router = express.Router()

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
    .get(getBrands)
    .post(uploadBrandImage, resizeImage, createBrandValidator, createBrand)

router.route('/:id')
    .get(getBrandValidator, getBrand)
    .put(uploadBrandImage, resizeImage, updateBrandValidator, updateBrand)
    .delete(deleteBrandValidator, deleteBrand)

module.exports = router