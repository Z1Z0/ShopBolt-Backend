// Packages
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const http = require('http')
const databaseConnection = require('./config/database')

// Routes
const categoriesRoutes = require('./routes/categoryRoute')
const subCategoriesRoutes = require('./routes/subCategoryRoute')
const brandsRoutes = require('./routes/brandRoute')

// Utilities
const ApiError = require('./utilities/apiError')

// Middlewares
const globalError = require('./middlewares/errorMiddleware')

// Dotenv config
dotenv.config({ path: 'config.env' })

// Variables
const app = express()
const PORT = process.env.PORT || 3002
const server = http.createServer(app)
const API = process.env.API_PATH || '/api/v1'

// Middlewares
app.use(express.json())
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
    console.log(`mode: ${process.env.NODE_ENV}`)
}

// Mount routes
app.use(`${API}/categories`, categoriesRoutes)
app.use(`${API}/subcategories`, subCategoriesRoutes)
app.use(`${API}/brands`, brandsRoutes)

app.all('*', (req, res, next) => {
    next(new ApiError(`Can't find this route ${req.originalUrl}`, 400))
})

// Global error handling middleware
app.use(globalError)

databaseConnection(process.env.DATABASE_URL).then(() => {
    server.listen(PORT, () => {
        console.log(`Server running on PORT ${PORT}`)
    })
})

// Handling rejections outside express
process.on('unhandledRejection', (error) => {
    console.error(`UnhandledRejection errors: ${error.name} | ${error.message}`)
    server.close(() => {
        console.error('Server shutting down...')
        process.exit(1)
    })
})