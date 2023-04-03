const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const ApiError = require('../utilities/apiError')

const BrandsModel = require('../models/brandModel')


// @desc    Get list of Brands
// @route   GET /api/v1/brands
// @access  Private
exports.getBrands = asyncHandler(async (req, res) => {
    const page = req.query.page || 1
    const limit = req.query.limit || 5
    const skip = (page - 1) * limit
    const brands = await BrandsModel.find({}).skip(skip).limit(limit)
    res.status(200).json({ results: brands.length, page, data: brands })
})

// @desc    Get a specific brand by id
// @route   GET /api/v1/brands/:id
// @access  Private
exports.getBrand = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const brand = await BrandsModel.findById(id)

    if (!brand) {
        return next(new ApiError(`There is no brand for this id ${id}`, 404))
    }
    res.status(200).json({ data: brand })
})

// @desc    Create brand
// @route   POST /api/v1/brands
// @access  Private
exports.createBrand = asyncHandler(async (req, res) => {
    const { name } = req.body
    const brand = await BrandsModel.create({ name, slug: slugify(name) })
    res.status(201).json({ data: brand })
})

// @desc    Update a specific brand
// @route   PUT /api/v1/brands/:id
// @access  Private
exports.updateBrand = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const { name } = req.body
    const brand = await BrandsModel.findByIdAndUpdate({ _id: id }, { name, slug: slugify(name) }, { new: true })

    if (!brand) {
        return next(new ApiError(`There is no brand for this id ${id}`, 404))
    }
    res.status(200).json({ data: brand })
})

// @desc    Delete a specific brand
// @route   DELETE /api/v1/brands/:id
// @access  Private
exports.deleteBrand = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const brand = await BrandsModel.findByIdAndDelete(id)

    if (!brand) {
        return next(new ApiError(`There is no brand for this id ${id}`, 404))
    }
    res.status(204).json()
})