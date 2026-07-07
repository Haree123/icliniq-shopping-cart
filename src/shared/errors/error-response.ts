import { ApiError } from './api.error';
import { ZodError } from 'zod';

export class ErrorResponse {
  static from(error: unknown): Response {
    if (error instanceof ApiError) {
      return Response.json(
        {
          success: false,
          message: error.message,
        },
        {
          status: error.statusCode,
        },
      );
    }

    if (error instanceof ZodError) {
      return Response.json(
        {
          success: false,
          message: 'Validation failed',
          errors: error.issues,
        },
        {
          status: 400,
        },
      );
    }

    console.error(error);

    return Response.json(
      {
        success: false,
        message: 'Internal Server Error',
      },
      {
        status: 500,
      },
    );
  }
}
