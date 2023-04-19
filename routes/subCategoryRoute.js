const express = require('express')

const authService = require('../services/authService')

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

router.route('/').post(authService.authorizationSecurity, authService.allowedTo('admin', 'manager'), setCategoryIDToBody, createSubCategoryValidator, createSubCategory).get(createFilterObject, getSubCategories)


router.route('/:id')
    .get(
        getSubCategoryValidator,
        getSubCategory
    )
    .put(
        authService.authorizationSecurity,
        authService.allowedTo('manager', 'admin'),
        updateSubCategoryValidator,
        updateSubCategory
    )
    .delete(
        authService.authorizationSecurity,
        authService.allowedTo('admin'),
        deleteSubCategoryValidator,
        deleteSubCategory
    )

module.exports = router