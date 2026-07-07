import { ApiError } from './api.error';

class NotFoundError extends ApiError {
  constructor(message: string) {
    super(404, message);
  }
}

export { NotFoundError };
