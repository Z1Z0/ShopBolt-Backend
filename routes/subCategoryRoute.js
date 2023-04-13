const express = require('express')

const router = express.Router({ mergeParams: true })

const {
    getSubCategories,
    createSubCategory,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory,
    createFilterObject,
    setCategoryIDToBody
} = require('../services/subCategoryService')

const {
    getSubCategoryValidator,
    createSubCategoryValidator,
    updateSubCategoryValidator,
    deleteSubCategoryValidator
} = require('../utilities/validators/subCategoryValidator')

router.route('/')
    .post(setCategoryIDToBody, createSubCategoryValidator, createSubCategory)
    .get(createFilterObject, getSubCategories)

router.route('/:id')
    .get(getSubCategoryValidator, getSubCategory)
    .put(updateSubCategoryValidator, updateSubCategory)
    .delete(deleteSubCategoryValidator, deleteSubCategory)
module.exports = router