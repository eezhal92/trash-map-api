import status from 'http-status'
import ExtendableError from 'es6-error'

export class HttpError extends ExtendableError {
  constructor (message, httpStatus, previousError) {
    /* eslint-disable no-param-reassign */
    if (message instanceof Error) {
      previousError = message
      message = previousError.message
    }

    super(message)
    this.httpStatus = httpStatus || status.INTERNAL_SERVER_ERROR
    this.previousError = previousError
  }

  send (res) {
    res.status(this.httpStatus)
    const body = { message: this.message }
    res.send(body)
  }
}

export class AuthorizationError extends HttpError {
  constructor (message, previousError) {
    super(message, status.UNAUTHORIZED, previousError)
  }
}

export class AuthenticationError extends HttpError {
  constructor (message, previousError) {
    super(message, status.FORBIDDEN, previousError)
  }
}

export class BadRequestError extends HttpError {
  constructor (message, previousError) {
    super(message, status.BAD_REQUEST, previousError)
  }
}

export class UnprocessableEntityError extends HttpError {
  /**
   * @param  {Object} constraintErrors  validation constraints error messages
   * @param  {Object} previousError
   */
  constructor (constraintErrors, previousError) {
    if (!constraintErrors) {
      throw new Error('Need constraint errors Object as first argument')
    }
    super('Cannot process your request', 422, previousError)
    this.constraintErrors = constraintErrors
  }
}

export class InternalServerError extends HttpError {
  constructor (message, previousError) {
    super(message, status.INTERNAL_SERVER_ERROR, previousError)
  }
}

export class NotFoundError extends HttpError {
  constructor (message, previousError) {
    super(message, status.NOT_FOUND, previousError)
  }
}
