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

    phone: String,

    profileImage: String,

    password: {
        type: String,
        required: [true, 'Password required and can not be empty'],
        minlength: [6, 'Password is too short']
    },

    passwordChangedAt: Date,

    passwordResetCode: String,

    passwordResetExpires: Date,

    passwordResetVerified: Boolean,

    role: {
        type: String,
        enum: ['user', 'admin', 'manager'],
        default: 'user'
    },
    wishlist: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Product'
        }
    ],
    addresses: [
        {
            id: { type: mongoose.Schema.Types.ObjectId },
            alias: String,
            details: String,
            phone: String,
            city: String,
            postalCode: String
        }
    ]
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