const path = require('path')
// Packages
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const http = require('http')
const cors = require('cors')
const compression = require('compression')
const databaseConnection = require('./config/database')

// Security libraries
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')

// Utilities
dotenv.config({ path: 'config.env' })
const ApiError = require('./utilities/apiError')

// Middlewares
const globalError = require('./middlewares/errorMiddleware')

// Routes
const mountRoutes = require('./routes/index')
const { webhookCheckout } = require('./services/orderService')

// Variables
const app = express()
const PORT = process.env.PORT || 3002
const server = http.createServer(app)
const API = process.env.API_PATH || '/api/v1'

// Limiter for calling APIs
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    message: 'Too much requests from this IP'
})

// Enable cors
app.use(cors())
app.options('*', cors())

// Compress all responses
app.use(compression())


// Middlewares
app.use(express.json({
    limit: '1mb',
    verify: (req, res, buf) => {
        req.rawBody = buf.toString()
    }
}))
app.use(express.static(path.join(__dirname, 'uploads')))

// Sanitize data to prevent NOSQL injection
app.use(mongoSanitize())
// Filtering special characters to prevent XSS attacks
app.use(xss())

// A middleware to prevent brute force attack
app.use('/api/v1/auth', limiter)

// A middleware to protect against HTTP Parameter Pollution attacks
app.use(hpp({ whitelist: ['price'] }))


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
    console.log(`mode: ${process.env.NODE_ENV}`)
}

// Stripe webhook checkout
app.post('/webhook-checkout', express.raw({ type: 'application/json' }), webhookCheckout)

// Mount routes
mountRoutes(app, API)

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