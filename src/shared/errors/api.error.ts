class ApiError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
  ) {
    super(message);

    this.name = this.constructor.name;
  }
}

export { ApiError };
