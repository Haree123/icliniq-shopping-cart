class ApiResponse {
  public static ok<T>(data: T, message = 'Success'): Response {
    return Response.json({ success: true, message, data }, { status: 200 });
  }

  public static created<T>(
    data: T,
    message = 'Resource created successfully',
  ): Response {
    return Response.json({ success: true, message, data }, { status: 201 });
  }

  public static noContent(): Response {
    return new Response(null, { status: 204 });
  }
}

export { ApiResponse };
