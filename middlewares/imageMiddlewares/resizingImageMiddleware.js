const asyncHandler = require('express-async-handler')
const { v4: uuidv4 } = require('uuid')
const sharp = require('sharp')

/**
 * Resize, change format, quality, and saving the image to the desk
 * 
 * @param department, `@example` (categories, brands, products, ...ect)
 * @param width The width of the image, **Should be** `Integer`, `@example` 600
 * @param height The height of the image, **Should be** `Integer`, `@example` 600
 * @param imageFormat The extension of the image, `@example` (jpeg, png, ...ect), and must be a `String`
 * @param imageQuality The quality for the image, quality should be `Int` and between **0-100**, `@example` 90
 */
exports.resizeImage = (department, width, height, imageFormat, imageQuality) => asyncHandler(async (req, res, next) => {

    if (req.file) {
        const filename = `${department}-${uuidv4()}-${Date.now()}.jpeg`
        await sharp(req.file.buffer)
            .resize(width, height)
            .toFormat(imageFormat)
            .jpeg({ quality: imageQuality })
            .toFile(`uploads/${department}/${filename}`)

        req.body.image = filename
    }

    next()

})