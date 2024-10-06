// Utility function for success response
export const successResponse = (
  statusCode = 200,
  message = "Success",
  data = {}
) => {
  return {
    StatusCode: statusCode,
    isBase64Encoded: false,
    headers: {
      "Access-Control-Allow-Origin": "*", // Corrected case of 'Origin'
    },
    message,
    data: JSON.stringify(data),
  };
};

// Utility function for error response
export const errorResponse = (
  statusCode = 500,
  message = "An error occurred",
  error = null
) => {
  return {
    StatusCode: statusCode,
    isBase64Encoded: false,
    headers: {
      "Access-Control-Allow-Origin": "*", // Corrected case of 'Origin'
    },
    message,
    error,
  };
};
