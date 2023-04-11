const BrandsModel = require('../models/brandModel')
const factory = require('./handlers/handlersFactory')
const { uploadSingleImage } = require('../middlewares/imageMiddlewares/uploadImageMiddleware')
const { resizeImage } = require('../middlewares/imageMiddlewares/resizingImageMiddleware')

exports.uploadBrandImage = uploadSingleImage('image')

exports.resizeImage = resizeImage('brand', 'brands', 600, 600, 'jpeg', 95)

// @desc    Get list of Brands
// @route   GET /api/v1/brands
// @access  Private
exports.getBrands = factory.getAll(BrandsModel)

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