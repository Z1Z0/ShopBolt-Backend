const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const ApiError = require('../utilities/apiError')

const ProductModel = require('../models/productModel')


// @desc    Get list of products
// @route   GET /api/v1/products
// @access  Private
exports.getProducts = asyncHandler(async (req, res) => {
    const page = req.query.page || 1
    const limit = req.query.limit || 5
    const skip = (page - 1) * limit
    const products = await ProductModel.find({}).skip(skip).limit(limit)
    res.status(200).json({ results: products.length, page, data: products })
})

// @desc    Get a specific product by id
// @route   GET /api/v1/products/:id
// @access  Private
exports.getProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const products = await ProductModel.findById(id)

    if (!products) {
        return next(new ApiError(`There is no product for this id ${id}`, 404))
    }
    res.status(200).json({ data: products })
})

// @desc    Create product
// @route   POST /api/v1/products
// @access  Private
exports.createProduct = asyncHandler(async (req, res) => {
    req.body.slug = slugify(req.body.title)
    const product = await ProductModel.create(req.body)
    res.status(201).json({ data: product })
})

// @desc    Update a specific product
// @route   PUT /api/v1/products/:id
// @access  Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    req.body.slug = slugify(req.body.title)
    const product = await ProductModel.findByIdAndUpdate({ _id: id }, req.body, { new: true })

    if (!product) {
        return next(new ApiError(`There is no product for this id ${id}`, 404))
    }
    res.status(200).json({ data: product })
})

// @desc    Delete a specific product
// @route   DELETE /api/v1/products/:id
// @access  Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const product = await ProductModel.findByIdAndDelete(id)

    if (!product) {
        return next(new ApiError(`There is no product for this id ${id}`, 404))
    }
    res.status(204).json()
})