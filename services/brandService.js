const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const ApiError = require('../utilities/apiError')

const BrandsModel = require('../models/brandModel')

const ApiFeatures = require('../utilities/apiFeatures')

const factory = require('./handlers/handlersFactory')


// @desc    Get list of Brands
// @route   GET /api/v1/brands
// @access  Private
exports.getBrands = asyncHandler(async (req, res) => {
    // QUERY build
    const documentsCount = await BrandsModel.countDocuments()
    const apiFeatures = new ApiFeatures(BrandsModel.find(), req.query)
        .pagination(documentsCount)
        .filter()
        .search()
        .sort()
        .limitFields()

    // Execute QUERY
    const { mongooseQuery, paginationResult } = apiFeatures
    const brands = await mongooseQuery
    res.status(200).json({ results: brands.length, paginationResult, data: brands })
})

// @desc    Get a specific brand by id
// @route   GET /api/v1/brands/:id
// @access  Private
exports.getBrand = factory.getOne(BrandsModel)

// @desc    Create brand
// @route   POST /api/v1/brands
// @access  Private
exports.createBrand = factory.createOne(BrandsModel)

// @desc    Update a specific brand
// @route   PUT /api/v1/brands/:id
// @access  Private
exports.updateBrand = factory.updateOne(BrandsModel)

// @desc    Delete a specific brand
// @route   DELETE /api/v1/brands/:id
// @access  Private
exports.deleteBrand = factory.deleteOne(BrandsModel)