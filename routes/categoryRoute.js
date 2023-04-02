const express = require('express')

const router = express.Router()

const subCategoryRoute = require('./subCategoryRoute')

const { getCategories, getCategory, createCategory, updateCategory, deleteCategory } = require('../services/categoryService')

const { getCategoryMiddleware, createCategoryValidator, updateCategoryMiddleware, deleteCategoryMiddleware } = require('../utilities/validators/categoryValidator')

router.use('/:categoryID/subcategories', subCategoryRoute)
router.route('/').get(getCategories).post(createCategoryValidator, createCategory)
router.route('/:id').get(getCategoryMiddleware, getCategory).put(updateCategoryMiddleware, updateCategory).delete(deleteCategoryMiddleware, deleteCategory)

module.exports = router