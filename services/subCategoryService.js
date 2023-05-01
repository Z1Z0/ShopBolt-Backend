const SubCategoryModel = require('../models/subCategoryModel')

const factory = require('./handlers/handlersFactory')

// Nested Route for GET
exports.createFilterObject = (req, res, next) => {

    let filterObject = {}
    if (req.params.categoryID) {
        filterObject = { category: req.params.categoryID }
    }
    req.filterObj = filterObject
    next()
}

// Nested Route for POST
exports.setCategoryIDToBody = (req, res, next) => {
    if (!req.body.category) {
        req.body.category = req.params.categoryID
    }
    next()
}

// @desc    Get list of SubCategories
// @route   GET /api/v1/subcategories
// @access  Private
exports.getSubCategories = factory.getAll(SubCategoryModel)

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