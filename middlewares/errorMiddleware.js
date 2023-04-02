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

const globalError = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500
    error.status = error.status || 'Error'

    switch (process.env.NODE_ENV) {
        case 'development':
            errorForDevelopment(error, res)
            break
        case 'production':
            errorForProduction(error, res)
            break
        default:
            errorForDevelopment(error, res)
            break
    }

    next()
}



module.exports = globalError