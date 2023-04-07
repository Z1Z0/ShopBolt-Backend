class ApiFeatures {
    constructor(mongooseQuery, queryString) {
        this.mongooseQuery = mongooseQuery
        this.queryString = queryString
    }

    filter() {
        // Filtering
        const queryStringObj = { ...this.queryString }
        const excludesFields = ['page', 'sort', 'limit', 'fields']
        excludesFields.forEach((field) => delete queryStringObj[field])

        // Apply filter
        let queryString = JSON.stringify(queryStringObj)
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)

        this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryString))
        return this
    }

    sort() {
        // Sorting
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.mongooseQuery = this.mongooseQuery.sort(sortBy)
        } else {
            this.mongooseQuery = this.mongooseQuery.sort('-createAt')
        }
        return this
    }

    limitFields() {
        // Fields limiting
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ')
            this.mongooseQuery = this.mongooseQuery.select(fields)
        } else {
            this.mongooseQuery = this.mongooseQuery.select('-__v')
        }
        return this
    }

    search(modelName) {
        // Search query
        if (this.queryString.search) {
            let query = {}

            switch (modelName) {
                case 'Products':
                    query.$or = [
                        { title: { $regex: this.queryString.search, $options: 'i' } },
                        { description: { $regex: this.queryString.search, $options: 'i' } }
                    ]
                    break

                default:
                    query = { name: { $regex: this.queryString.search, $options: 'i' } }
                    break
            }

            this.mongooseQuery = this.mongooseQuery.find(query)
        }
        return this
    }

    pagination(countDocuments) {
        // Pagination
        const page = this.queryString.page || 1
        const limit = this.queryString.limit || 50
        const skip = (page - 1) * limit
        const endIndex = page * limit

        const pagination = {}
        pagination.currentPage = page
        pagination.limit = limit
        pagination.numberOfPages = Math.ceil(countDocuments / limit)

        // Next page
        if (endIndex < countDocuments) {
            pagination.next = page + 1
        }

        // Prev page
        if (skip > 0) {
            pagination.prev = page - 1
        }

        this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit)
        this.paginationResult = pagination
        return this
    }
}

module.exports = ApiFeatures