class CustomError extends Error {
  constructor(statusCode, message) {
    super(message); // set message in parent Error class
    this.statusCode = statusCode;
  }
}

module.exports = CustomError;
