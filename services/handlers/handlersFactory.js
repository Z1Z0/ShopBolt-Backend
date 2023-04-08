const asyncHandler = require('express-async-handler')
const ApiError = require('../../utilities/apiError')
const ApiFeatures = require('../../utilities/apiFeatures')

exports.createOne = (Model) => asyncHandler(async (req, res) => {
    const document = await Model.create(req.body)
    res.status(201).json({ data: document })
})

exports.getOne = (Model) => asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const document = await Model.findById(id)

    if (!document) {
        return next(new ApiError(`There is no document for this id ${id}`, 404))
    }
    res.status(200).json({ data: document })
})

exports.getAll = (Model, modelName = '') => asyncHandler(async (req, res) => {
    let filter = {}
    if (req.filterObj) { filter = req.filterObj }

    // QUERY build
    const documentsCount = await Model.countDocuments()
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
        .pagination(documentsCount)
        .filter()
        .search(modelName)
        .sort()
        .limitFields()

    // Execute QUERY
    const { mongooseQuery, paginationResult } = apiFeatures
    const documents = await mongooseQuery
    res.status(200).json({ results: documents.length, paginationResult, data: documents })
})

exports.updateOne = (Model) => asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true })

    if (!document) {
        return next(new ApiError(`There is no document for this id ${req.params.id}`, 404))
    }
    res.status(200).json({ data: document })
})

exports.deleteOne = (Model) => asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const document = await Model.findByIdAndDelete(id)

    if (!document) {
        return next(new ApiError(`There is no document for this id ${id}`, 404))
    }
    res.status(204).json()
})