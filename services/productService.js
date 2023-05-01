const sharp = require('sharp')
const asyncHandler = require('express-async-handler')
const { v4: uuidv4 } = require('uuid')
const ProductModel = require('../models/productModel')

const factory = require('./handlers/handlersFactory')


const { uploadMultipleImages } = require('../middlewares/imageMiddlewares/uploadImageMiddleware')

exports.uploadProductImages = uploadMultipleImages([
    {
        name: 'imageCover',
        maxCount: 1
    },
    {
        name: 'images',
        maxCount: 5
    }
])

exports.resizeImage = asyncHandler(async (req, res, next) => {
    if (req.files.imageCover) {
        const imageCoverFileName = `product-${uuidv4()}-${Date.now()}-cover.jpeg`
        await sharp(req.files.imageCover[0].buffer)
            .resize(2000, 1333)
            .toFormat('jpeg')
            .jpeg({ quality: 95 })
            .toFile(`uploads/products/${imageCoverFileName}`)

        req.body.imageCover = imageCoverFileName
    }

    if (req.files.images) {
        req.body.images = []
        Promise.all(
            req.files.images.map(async (image, index) => {
                const imageName = `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`
                await sharp(image.buffer)
                    .resize(1000, 1000)
                    .toFormat('jpeg')
                    .jpeg({ quality: 95 })
                    .toFile(`uploads/products/${imageName}`)

                req.body.images.push(imageName)
            })
        )
        next()
    }
})


// @desc    Get list of products
// @route   GET /api/v1/products
// @access  Private
exports.getProducts = factory.getAll(ProductModel, 'Products')

// @desc    Get a specific product by id
// @route   GET /api/v1/products/:id
// @access  Private
exports.getProduct = factory.getOne(ProductModel, 'reviews')

// @desc    Create product
// @route   POST /api/v1/products
// @access  Private
exports.createProduct = factory.createOne(ProductModel)

// @desc    Update a specific product
// @route   PUT /api/v1/products/:id
// @access  Private
exports.updateProduct = factory.updateOne(ProductModel)

// @desc    Delete a specific product
// @route   DELETE /api/v1/products/:id
// @access  Private
exports.deleteProduct = factory.deleteOne(ProductModel)