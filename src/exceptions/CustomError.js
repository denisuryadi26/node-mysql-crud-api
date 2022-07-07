class CustomError extends Error {
  constructor(message, statusCode = 400, data = []) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
  }
}

module.exports = CustomError;
