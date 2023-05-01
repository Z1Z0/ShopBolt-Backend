const express = require('express')

const router = express.Router()

const { authorizationSecurity, allowedTo } = require('../services/authService')

const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadProductImages,
    resizeImage
} = require('../services/productService')

const {
    getProductValidator,
    createProductValidator,
    updateProductValidator,
    deleteProductValidator
} = require('../utilities/validators/productValidator')

const reviewRoute = require('./reviewRoute')

router.use('/:productID/reviews', reviewRoute)

router.route('/')
    .get(getProducts)
    .post(authorizationSecurity, allowedTo('manager', 'admin'), uploadProductImages, resizeImage, createProductValidator, createProduct)

router.route('/:id')
    .get(getProductValidator, getProduct)
    .put(authorizationSecurity, allowedTo('manager', 'admin'), uploadProductImages, resizeImage, updateProductValidator, updateProduct)
    .delete(authorizationSecurity, allowedTo('admin'), deleteProductValidator, deleteProduct)

module.exports = router