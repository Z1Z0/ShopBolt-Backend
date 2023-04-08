const ProductModel = require('../models/productModel')

const factory = require('./handlers/handlersFactory')

// @desc    Get list of products
// @route   GET /api/v1/products
// @access  Private
exports.getProducts = factory.getAll(ProductModel, 'Products')

// @desc    Get a specific product by id
// @route   GET /api/v1/products/:id
// @access  Private
exports.getProduct = factory.getOne(ProductModel)

// @desc    Create product
// @route   POST /api/v1/products
// @access  Private
exports.createProduct = factory.createOne(ProductModel)

// @desc    Update a specific product
// @route   PUT /api/v1/products/:id
// @access  Private
exports.updateProduct = factory.updateOne(ProductModel)

// @desc    Delete a specific product
// @route   DELETE /api/v1/products/:id
// @access  Private
exports.deleteProduct = factory.deleteOne(ProductModel)