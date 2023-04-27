const express = require('express')

const { authorizationSecurity, allowedTo } = require('../services/authService')

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

const router = express.Router({ mergeParams: true })

router.route('/')
    .post(authorizationSecurity, allowedTo('manager', 'admin'), setCategoryIDToBody, createSubCategoryValidator, createSubCategory)
    .get(createFilterObject, getSubCategories)

router.route('/:id')
    .get(getSubCategoryValidator, getSubCategory)
    .put(authorizationSecurity, allowedTo('manager', 'admin'), updateSubCategoryValidator, updateSubCategory)
    .delete(authorizationSecurity, allowedTo('admin'), deleteSubCategoryValidator, deleteSubCategory)

module.exports = router