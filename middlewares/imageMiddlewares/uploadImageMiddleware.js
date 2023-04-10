const multer = require('multer')
const ApiError = require('../../utilities/apiError')

const multerOptions = () => {
    const multerStorage = multer.memoryStorage()

    const multerFilter = (req, file, cb) => {
        if (file.mimetype.startsWith('image')) {
            cb(null, true)
        } else {
            cb(new ApiError('Only images allowed', 400), false)
        }
    }

    const upload = multer({ storage: multerStorage, fileFilter: multerFilter })
    return upload
}

/**
 * A middleware that allow you to upload a single image
 * 
 * @param fieldName It's the image variable in the mongodb Schema 
 * `@example`: **'image'**
 */
exports.uploadSingleImage = (fieldName) => multerOptions().single(fieldName)

/**
 * A middleware that allow you to upload a multiple images
 * 
 * @param arrayOfFields It's an `Array` of fields variable in the mongodb Schema 
 * `@example`: **'[{imageCover: image}, {images: [images]}]'**
 */
exports.uploadMultipleImages = (arrayOfFields) => multerOptions().fields(arrayOfFields)