const express = require('express')

const router = express.Router()

const authService = require('../services/authService')

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

router.route('/')
    .get(
        getProducts
    )
    .post(
        authService.authorizationSecurity,
        // authService.allowedTo('manager', 'admin'),
        uploadProductImages,
        resizeImage,
        createProductValidator,
        createProduct
    )

router.route('/:id')
    .get(
        getProductValidator,
        getProduct
    )
    .put(
        authService.authorizationSecurity,
        // authService.allowedTo('manager', 'admin'),
        uploadProductImages,
        resizeImage,
        updateProductValidator,
        updateProduct
    )
    .delete(
        authService.authorizationSecurity,
        // authService.allowedTo('admin'),
        deleteProductValidator,
        deleteProduct
    )

module.exports = router