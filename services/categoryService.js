const CategoryModel = require('../models/categoryModel')
const factory = require('./handlers/handlersFactory')
const { uploadSingleImage } = require('../middlewares/imageMiddlewares/uploadImageMiddleware')
const { resizeImage } = require('../middlewares/imageMiddlewares/resizingImageMiddleware')

exports.uploadCategoryImage = uploadSingleImage('image')

exports.resizeImage = resizeImage('category', 'categories', 600, 600, 'jpeg', 95)

// @desc    Get list of categories
// @route   GET /api/v1/categories
// @access  Private
exports.getCategories = factory.getAll(CategoryModel)

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