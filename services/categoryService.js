const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const ApiError = require('../utilities/apiError')

const CategoryModel = require('../models/categoryModel')

const ApiFeatures = require('../utilities/apiFeatures')

const factory = require('./handlers/handlersFactory')

// @desc    Get list of categories
// @route   GET /api/v1/categories
// @access  Private
exports.getCategories = asyncHandler(async (req, res) => {
    // QUERY build
    const documentsCount = await CategoryModel.countDocuments()
    const apiFeatures = new ApiFeatures(CategoryModel.find(), req.query)
        .pagination(documentsCount)
        .filter()
        .search()
        .sort()
        .limitFields()

    // Execute QUERY
    const { mongooseQuery, paginationResult } = apiFeatures
    const categories = await mongooseQuery
    res.status(200).json({ results: categories.length, paginationResult, data: categories })
})

// @desc    Get a specific category by id
// @route   GET /api/v1/categories/:id
// @access  Private
exports.getCategory = factory.getOne(CategoryModel)

// @desc    Create category
// @route   POST /api/v1/categories
// @access  Private
exports.createCategory = factory.createOne(CategoryModel)

// @desc    Update a specific category
// @route   PUT /api/v1/categories/:id
// @access  Private
exports.updateCategory = factory.updateOne(CategoryModel)

// @desc    Delete a specific category
// @route   DELETE /api/v1/categories/:id
// @access  Private
exports.deleteCategory = factory.deleteOne(CategoryModel)