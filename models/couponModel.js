const mongoose = require('mongoose')

const couponSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Coupon name required']
    },
    expire: {
        type: Date,
        required: [true, 'Coupon expire date is required']
    },
    discount: {
        type: Number,
        required: [true, 'Coupon discount value required']
    }
})

module.exports = mongoose.model('Coupon', couponSchema)