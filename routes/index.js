// Routes
const categoriesRoutes = require('./categoryRoute')
const subCategoriesRoutes = require('./subCategoryRoute')
const brandsRoutes = require('./brandRoute')
const productsRoutes = require('./productRoute')
const userRoutes = require('./userRoute')
const authRoutes = require('./authRoute')
const reviewsRoutes = require('./reviewRoute')
const wishlistRoutes = require('./wishlistRoute')
const addressRoutes = require('./addressesRoute')
const couponRoutes = require('./couponRoute')
const cartRoutes = require('./cartRoute')

const mountRoutes = (app, ApiBaseURL) => {
    // Mount routes
    app.use(`${ApiBaseURL}/categories`, categoriesRoutes)
    app.use(`${ApiBaseURL}/subcategories`, subCategoriesRoutes)
    app.use(`${ApiBaseURL}/brands`, brandsRoutes)
    app.use(`${ApiBaseURL}/products`, productsRoutes)
    app.use(`${ApiBaseURL}/users`, userRoutes)
    app.use(`${ApiBaseURL}/auth`, authRoutes)
    app.use(`${ApiBaseURL}/reviews`, reviewsRoutes)
    app.use(`${ApiBaseURL}/wishlist`, wishlistRoutes)
    app.use(`${ApiBaseURL}/addresses`, addressRoutes)
    app.use(`${ApiBaseURL}/coupons`, couponRoutes)
    app.use(`${ApiBaseURL}/cart`, cartRoutes)
}

module.exports = mountRoutes