import { ApiError } from './api.error';

class ConflictError extends ApiError {
  constructor(message: string) {
    super(409, message);
  }
}

export { ConflictError };
