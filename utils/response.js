// Utility function for success response
const successResponse = (statusCode = 200, message = "Success", data = {}) => {
  return {
    StatusCode: statusCode,
    isBase64Encoded: false,
    headers: {
      "Access-Control-Allow-origin": "*",
    },
    message,
    data: JSON.stringify(data),
  };
};

// Utility function for error response
const errorResponse = (
  statusCode = 500,
  message = "An error occurred",
  error = null
) => {
  return {
    StatusCode: statusCode,
    isBase64Encoded: false,
    headers: {
      "Access-Control-Allow-origin": "*",
    },
    message,
    error,
  };
};

module.exports = { successResponse, errorResponse };
