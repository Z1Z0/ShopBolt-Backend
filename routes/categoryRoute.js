const express = require('express')

const router = express.Router()

const subCategoryRoute = require('./subCategoryRoute')

const { authorizationSecurity, allowedTo } = require('../services/authService')

const {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    uploadCategoryImage,
    resizeImage
} = require('../services/categoryService')

const {
    getCategoryValidator,
    createCategoryValidator,
    updateCategoryValidator,
    deleteCategoryValidator
} = require('../utilities/validators/categoryValidator')

router.use('/:categoryID/subcategories', subCategoryRoute)

router.route('/')
    .get(
        getCategories
    )
    .post(
        authorizationSecurity,
        allowedTo('manager', 'admin'),
        uploadCategoryImage,
        resizeImage,
        createCategoryValidator,
        createCategory
    )

router.route('/:id')
    .get(
        getCategoryValidator,
        getCategory
    )
    .put(
        authorizationSecurity,
        allowedTo('manager', 'admin'),
        uploadCategoryImage,
        resizeImage,
        updateCategoryValidator,
        updateCategory
    )
    .delete(
        authorizationSecurity,
        allowedTo('admin'),
        deleteCategoryValidator,
        deleteCategory
    )

module.exports = router