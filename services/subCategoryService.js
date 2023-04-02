const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const ApiError = require('../utilities/apiError')

const SubCategoryModel = require('../models/subCategoryModel')

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
    const page = req.query.page || 1
    const limit = req.query.limit || 5
    const skip = (page - 1) * limit

    const subCategories = await SubCategoryModel.find(req.filterObj)
        .skip(skip)
        .limit(limit)
    // .populate({ path: 'category', select: 'name -_id' })
    res.status(200).json({ results: subCategories.length, page, data: subCategories })
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
exports.createSubCategory = asyncHandler(async (req, res) => {
    const { name, category } = req.body
    const subCategory = await SubCategoryModel.create({ name, slug: slugify(name), category })
    return res.status(201).json({ data: subCategory })
})

// @desc    Get a specific subCategory by id
// @route   GET /api/v1/subcategories/:id
// @access  Private
exports.getSubCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const subCategory = await SubCategoryModel.findById(id)
    // .populate({ path: 'category', select: 'name -_id' })

    if (!subCategory) {
        return next(new ApiError(`There is no SubCategory for this id ${id}`, 404))
    }
    res.status(200).json({ data: subCategory })
})

// @desc    Update a specific SubCategory
// @route   PUT /api/v1/subcategories/:id
// @access  Private
exports.updateSubCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const { name, category } = req.body
    const subCategory = await SubCategoryModel.findByIdAndUpdate({ _id: id }, { name, slug: slugify(name), category }, { new: true })

    if (!subCategory) {
        return next(new ApiError(`There is no SubCategory for this id ${id}`, 404))
    }
    res.status(200).json({ data: subCategory })
})

// @desc    Delete a specific SubCategory
// @route   DELETE /api/v1/subcategories/:id
// @access  Private
exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const subCategory = await SubCategoryModel.findByIdAndDelete(id)

    if (!subCategory) {
        return next(new ApiError(`There is no SubCategory for this id ${id}`, 404))
    }
    res.status(204).json()
})