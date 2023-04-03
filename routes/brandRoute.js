const express = require('express')

const router = express.Router()

const { getBrands, getBrand, createBrand, updateBrand, deleteBrand } = require('../services/brandService')

const { getBrandMiddleware, createBrandValidator, updateBrandMiddleware, deleteBrandMiddleware } = require('../utilities/validators/brandValidator')

router.route('/').get(getBrands).post(createBrandValidator, createBrand)
router.route('/:id').get(getBrandMiddleware, getBrand).put(updateBrandMiddleware, updateBrand).delete(deleteBrandMiddleware, deleteBrand)

module.exports = router