const ApiError = require('../utilities/apiError')

const errorForDevelopment = (error, res) => {
    res.status(error.statusCode).json({
        status: error.status,
        error: error,
        message: error.message,
        stack: error.stack
    })
}

const errorForProduction = (error, res) => {
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
    })
}

const handleJWTInvalidSignature = () => new ApiError('Invalid token, please signin', 401)

const handleJWTExpired = () => new ApiError('Expired token, please signin again', 401)

const globalError = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500
    error.status = error.status || 'Error'

    switch (process.env.NODE_ENV) {
        case 'development':
            errorForDevelopment(error, res)
            break
        case 'production':
            switch (error.name) {
                case 'JsonWebTokenError':
                    handleJWTInvalidSignature()
                    break
                case 'TokenExpiredError':
                    handleJWTExpired()
                    break
                default:
                    handleJWTInvalidSignature()
                    break
            }
            errorForProduction(error, res)
            break
        default:
            errorForDevelopment(error, res)
            break
    }

    next()
}



module.exports = globalError