const express = require('express')

const router = express.Router()

const subCategoryRoute = require('./subCategoryRoute')

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
    .get(getCategories)
    .post(uploadCategoryImage, resizeImage, createCategoryValidator, createCategory)

router.route('/:id')
    .get(getCategoryValidator, getCategory)
    .put(uploadCategoryImage, resizeImage, updateCategoryValidator, updateCategory)
    .delete(deleteCategoryValidator, deleteCategory)

module.exports = router