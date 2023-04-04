const express = require('express')

const router = express.Router()

const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../services/productService')

const { getProductValidator, createProductValidator, updateProductValidator, deleteProductValidator } = require('../utilities/validators/productValidator')

router.route('/').get(getProducts).post(createProductValidator, createProduct)
router.route('/:id').get(getProductValidator, getProduct).put(updateProductValidator, updateProduct).delete(deleteProductValidator, deleteProduct)

module.exports = router