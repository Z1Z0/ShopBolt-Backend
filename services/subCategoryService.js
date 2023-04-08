const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const ApiError = require('../utilities/apiError')

const SubCategoryModel = require('../models/subCategoryModel')

const ApiFeatures = require('../utilities/apiFeatures')

const factory = require('./handlers/handlersFactory')

exports.createFilterObject = (req, res, next) => {
    let filterObject = {}
    if (req.params.categoryID) {
        filterObject = { category: req.params.categoryID }
    }
    req.filterObj = filterObject
    next()
}

// @desc    Get list of SubCategories
// @route   GET /api/v1/subcategories
// @access  Private
exports.getSubCategories = asyncHandler(async (req, res) => {
    // QUERY build
    const documentsCount = await SubCategoryModel.countDocuments()
    const apiFeatures = new ApiFeatures(SubCategoryModel.find(), req.query)
        .pagination(documentsCount)
        .filter()
        .search()
        .sort()
        .limitFields()

    // Execute QUERY
    const { mongooseQuery, paginationResult } = apiFeatures
    const subCategories = await mongooseQuery
    res.status(200).json({ results: subCategories.length, paginationResult, data: subCategories })
})

exports.setCategoryIDToBody = (req, res, next) => {
    if (!req.body.category) {
        req.body.category = req.params.categoryID
    }
    next()
}

// @desc    Create SubCategory
// @route   POST /api/v1/subCategories
// @access  Private
exports.createSubCategory = factory.createOne(SubCategoryModel)

// @desc    Get a specific subCategory by id
// @route   GET /api/v1/subcategories/:id
// @access  Private
exports.getSubCategory = factory.getOne(SubCategoryModel)

// @desc    Update a specific SubCategory
// @route   PUT /api/v1/subcategories/:id
// @access  Private
exports.updateSubCategory = factory.updateOne(SubCategoryModel)

// @desc    Delete a specific SubCategory
// @route   DELETE /api/v1/subcategories/:id
// @access  Private
exports.deleteSubCategory = factory.deleteOne(SubCategoryModel)