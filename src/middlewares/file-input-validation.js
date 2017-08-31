import { UnprocessableEntityError } from 'src/errors/http'

/**
 * Currently support `single` multer upload.
 * @param  fieldName
 * @return {Function}
 */
export default function fileInputValidation (fieldName) {
  return (req, res, next) => {
    if (!req.file) {
      return next(new UnprocessableEntityError({ [fieldName]: [`The field ${fieldName} is required.`] }))
    }

    return next()
  }
}
