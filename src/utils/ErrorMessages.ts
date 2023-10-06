interface CustomError extends Error {
  validator?: {
    schema?: {
      properties?: any;
    };
  };
}

export function handleNotFoundError(error: CustomError, set: any) {
  set.status = 404;
  return { message: 'Not Found :(', error };
}

export function handleInternalServerError(error: CustomError, set: any) {
  set.status = 500;
  return { message: 'Internal Server Error :(', error };
}

export function handleValidation(error: CustomError, set: any) {
  set.status = 400;
  if (
    error.validator &&
    error.validator.schema &&
    error.validator.schema.properties
  ) {
    return {
      message: 'Validation Error :(',
      error: error.validator.schema.properties,
    };
  } else {
    return {
      message: 'Validation Error :(',
      error: error,
    };
  }
}

export function handleParseError(error: CustomError, set: any) {
  set.status = 400;
  return { message: 'Parse Error :(', error };
}

export function handleUnknownError(error: CustomError, set: any) {
  set.status = 500;
  return { message: 'Unknown Error :(', error };
}

export function ErrorMessages(
  code: string,
  error: Error | CustomError,
  set: any
) {
  switch (code) {
    case 'NOT_FOUND':
      return handleNotFoundError(error, set);
    case 'INTERNAL_SERVER_ERROR':
      return handleInternalServerError(error, set);
    case 'VALIDATION':
      return handleValidation(error, set);
    case 'PARSE':
      return handleParseError(error, set);
    case 'UNKNOWN':
      return handleUnknownError(error, set);
    default:
      return { message: error };
  }
}
