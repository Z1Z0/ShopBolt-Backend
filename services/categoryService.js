const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const ApiError = require('../utilities/apiError')

const CategoryModel = require('../models/categoryModel')

const ApiFeatures = require('../utilities/apiFeatures')


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
exports.getCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const category = await CategoryModel.findById(id)

    if (!category) {
        return next(new ApiError(`There is no category for this id ${id}`, 404))
    }
    res.status(200).json({ data: category })
})

// @desc    Create category
// @route   POST /api/v1/categories
// @access  Private
exports.createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body
    const category = await CategoryModel.create({ name, slug: slugify(name) })
    res.status(201).json({ data: category })
})

// @desc    Update a specific category
// @route   PUT /api/v1/categories/:id
// @access  Private
exports.updateCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const { name } = req.body
    const category = await CategoryModel.findByIdAndUpdate({ _id: id }, { name, slug: slugify(name) }, { new: true })

    if (!category) {
        return next(new ApiError(`There is no category for this id ${id}`, 404))
    }
    res.status(200).json({ data: category })
})

// @desc    Delete a specific category
// @route   DELETE /api/v1/categories/:id
// @access  Private
exports.deleteCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const category = await CategoryModel.findByIdAndDelete(id)

    if (!category) {
        return next(new ApiError(`There is no category for this id ${id}`, 404))
    }
    res.status(204).json()
})