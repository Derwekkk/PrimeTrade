const sendSuccess = (res, statusCode, message, data = {}) => {
  res.status(statusCode).json({
    status: "success",
    message,
    data,
  });
};

const sendError = (res, error, statusCode = 500) => {
  res.status(statusCode).json({
    status: "error",
    message: error.message || "Something went wrong",
  });
};

module.exports = { sendSuccess, sendError };
