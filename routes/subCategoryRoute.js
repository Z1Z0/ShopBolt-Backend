const express = require('express')

const router = express.Router({ mergeParams: true })

const { getSubCategories, createSubCategory, getSubCategory, updateSubCategory, deleteSubCategory, createFilterObject, setCategoryIDToBody } = require('../services/subCategoryService')

const { getSubCategoryMiddleware, createSubCategoryValidator, updateSubCategoryMiddleware, deleteSubCategoryMiddleware } = require('../utilities/validators/subCategoryValidator')

router.route('/')
    .post(setCategoryIDToBody, createSubCategoryValidator, createSubCategory)
    .get(createFilterObject, getSubCategories)
router.route('/:id')
    .get(getSubCategoryMiddleware, getSubCategory)
    .put(updateSubCategoryMiddleware, updateSubCategory)
    .delete(deleteSubCategoryMiddleware, deleteSubCategory)
module.exports = router