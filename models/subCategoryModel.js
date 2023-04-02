const mongoose = require('mongoose')

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: [true, 'SubCategory already exist'],
        minlength: [2, 'SubCategory name is too short'],
        maxlength: [32, 'SubCategory name is too long'],
    },
    slug: {
        type: String,
        lowercase: true
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: [true, 'SubCategory should have Main Category']
    }
}, { timestamps: true })

module.exports = mongoose.model('SubCategory', subCategorySchema)