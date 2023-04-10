const express = require('express')

const router = express.Router()

const { getProducts, getProduct, createProduct, updateProduct, deleteProduct, uploadProductImages, resizeImage } = require('../services/productService')

const { getProductValidator, createProductValidator, updateProductValidator, deleteProductValidator } = require('../utilities/validators/productValidator')

router.route('/').get(getProducts).post(uploadProductImages, resizeImage, createProductValidator, createProduct)
router.route('/:id').get(getProductValidator, getProduct).put(uploadProductImages, resizeImage, updateProductValidator, updateProduct).delete(deleteProductValidator, deleteProduct)

module.exports = router