import { ApiError } from './api.error';

class BadRequestError extends ApiError {
  constructor(message = 'Bad Request') {
    super(400, message);
  }
}

export { BadRequestError };
