const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name required and can not be empty']
    },

    slug: {
        type: String,
        lowercase: true
    },

    email: {
        type: String,
        required: [true, 'Email required and can not be empty'],
        unique: true,
        lowercase: true
    },

    phone: String,

    profileImage: String,

    password: {
        type: String,
        required: [true, 'Password required and can not be empty'],
        minlength: [6, 'Password is too short']
    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
},
    { timestamps: true }
)

const User = mongoose.model('User', userSchema)
module.exports = User