class ResponseHandler {
  static sendSuccessResponse(res, data) {
    res.status(200).json({ success: true, data });
  }

  static sendErrorResponse(res, message, statusCode = 500) {
    res.status(statusCode).json({ success: false, error: message });
  }

  static sendValidationError(res, errors, statusCode = 400) {
    res.status(statusCode).json({ success: false, errors });
  }
}

module.exports = ResponseHandler;
