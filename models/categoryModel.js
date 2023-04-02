const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name required'],
        unique: [true, 'Category already exist'],
        minlength: [3, 'Category name is too short'],
        maxlength: [32, 'Category name is too long'],
    },
    slug: {
        type: String,
        lowercase: true
    },
    image: String
}, { timestamps: true })

const categoryModel = mongoose.model('Category', categorySchema)

module.exports = categoryModel