const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const ApiError = require('../utilities/apiError')
const ApiFeatures = require('../utilities/apiFeatures')

const ProductModel = require('../models/productModel')

const factory = require('./handlers/handlersFactory')


// @desc    Get list of products
// @route   GET /api/v1/products
// @access  Private
exports.getProducts = asyncHandler(async (req, res) => {

    // QUERY build
    const documentsCount = await ProductModel.countDocuments()
    const apiFeatures = new ApiFeatures(ProductModel.find(), req.query)
        .pagination(documentsCount)
        .filter()
        .search('Products')
        .sort()
        .limitFields()
    // let mongooseQuery = ProductModel.find(JSON.parse(queryString)).skip(skip).limit(limit).populate({ path: 'category', select: 'name -_id' })

    // Execute QUERY
    const { mongooseQuery, paginationResult } = apiFeatures
    const products = await mongooseQuery
    res.status(200).json({ results: products.length, paginationResult, data: products })
})

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