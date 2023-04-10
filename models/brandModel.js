const mongoose = require('mongoose')

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Brand name required'],
        unique: [true, 'Brand already exist'],
        minlength: [3, 'Brand name is too short'],
        maxlength: [32, 'Brand name is too long'],
    },
    slug: {
        type: String,
        lowercase: true
    },
    image: String
}, { timestamps: true })

const setImageURL = (doc) => {
    if (doc.image) {
        const imageURL = `${process.env.BASE_URL}/brands/${doc.image}`
        doc.image = imageURL
    }
}

brandSchema.post('init', (doc) => {
    setImageURL(doc)
})

brandSchema.post('save', (doc) => {
    setImageURL(doc)
})

const brandModel = mongoose.model('Brand', brandSchema)

module.exports = brandModel