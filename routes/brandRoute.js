const express = require('express')

const router = express.Router()

const { getBrands, getBrand, createBrand, updateBrand, deleteBrand, uploadBrandImage, resizeImage } = require('../services/brandService')

const { getBrandMiddleware, createBrandValidator, updateBrandMiddleware, deleteBrandMiddleware } = require('../utilities/validators/brandValidator')

router.route('/').get(getBrands).post(uploadBrandImage, resizeImage, createBrandValidator, createBrand)
router.route('/:id').get(getBrandMiddleware, getBrand).put(uploadBrandImage, resizeImage, updateBrandMiddleware, updateBrand).delete(deleteBrandMiddleware, deleteBrand)

module.exports = router