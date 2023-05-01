const mongoose = require('mongoose')
const ProductModel = require('./productModel')

const reviewSchema = new mongoose.Schema({
    title: {
        type: String
    },
    ratings: {
        type: Number,
        min: [1, 'Minimum rating value is 1'],
        max: [5, 'Maximum rating value is 5'],
        required: [true, 'Rating is required to add a review']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Review must belong to a user']
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: [true, 'Review must belong to a product']
    }
}, { timestamps: true })

reviewSchema.statics.calculateAvgRatingsAndQuantity = async function (productID) {
    const result = await this.aggregate([
        { $match: { product: productID } },
        { $group: { _id: 'product', avgRatings: { $avg: '$ratings' }, ratingsQuantity: { $sum: 1 } } }
    ])

    if (result.length > 0) {
        await ProductModel.findByIdAndUpdate(productID, {
            ratingsAverage: result[0].avgRatings,
            ratingsQuantity: result[0].ratingsQuantity
        })
    } else {
        await ProductModel.findByIdAndUpdate(productID, {
            ratingsAverage: 0,
            ratingsQuantity: 0
        })
    }
}

reviewSchema.post('save', async function () {
    await this.constructor.calculateAvgRatingsAndQuantity(this.product)
})

reviewSchema.post('deleteOne', { document: true, query: false }, async function () {
    await this.constructor.calculateAvgRatingsAndQuantity(this.product)
})

module.exports = mongoose.model('Review', reviewSchema)