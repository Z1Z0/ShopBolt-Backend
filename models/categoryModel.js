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

const setImageURL = (doc) => {
    if (doc.image) {
        const imageURL = `${process.env.BASE_URL}/categories/${doc.image}`
        doc.image = imageURL
    }
}

categorySchema.post('init', (doc) => {
    setImageURL(doc)
})

categorySchema.post('save', (doc) => {
    setImageURL(doc)
})

const categoryModel = mongoose.model('Category', categorySchema)

module.exports = categoryModel