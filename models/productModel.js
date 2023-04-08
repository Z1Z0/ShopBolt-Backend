const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, 'Product title too short, minimum character is 3'],
        maxlength: [100, 'Product title too long, maximum character is 3']
    },
    slug: {
        type: String,
        required: true,
        lowercase: true
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
        minlength: [20, 'Product description too short, minimum character is 20']
    },
    quantity: {
        type: Number,
        required: [true, 'Product quantity is required']
    },
    sold: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        trim: true,
        max: [100000, 'Product price is too high']
    },
    priceAfterDiscount: {
        type: Number
    },
    colors: [String],
    imageCover: {
        type: String,
        required: [true, 'Product image cover is required']
    },
    images: [String],
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: [true, 'Product should belong to category']
    },
    subCategories: {
        type: mongoose.Schema.ObjectId,
        ref: 'SubCategory'
    },
    brand: {
        type: mongoose.Schema.ObjectId,
        ref: 'Brand'
    },
    ratingsAverage: {
        type: Number,
        min: [1, 'Rating must not be less than 1'],
        max: [5, 'Rating must not be greater than 5']
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

productSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'category',
        select: 'name -_id'
    })
    next()
})

module.exports = mongoose.model('Product', productSchema)