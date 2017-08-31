import { HttpError, UnprocessableEntityError } from 'src/errors/http'

export default function errorToResponse () {
  return (err, req, res, next) => {
    const payload = { message: err.message }

    if (process.env.NODE_ENV === 'development') {
      payload.stack = err.stack
    }

    if (err instanceof HttpError) {
      if (err instanceof UnprocessableEntityError) {
        payload.errors = err.constraintErrors
        delete payload.stack
      }

      return res.status(err.httpStatus).json(payload)
    }

    payload.message = 'Unknown error'

    return res.status(500).json(payload)
  }
}
