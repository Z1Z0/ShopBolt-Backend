const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

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

    phone: {
        type: String,
        unique: true
    },

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

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 12)
    next()
})

const userModel = mongoose.model('User', userSchema)
module.exports = userModel