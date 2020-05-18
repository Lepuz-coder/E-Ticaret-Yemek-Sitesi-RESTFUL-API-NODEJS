module.exports = class AppError extends Error {
  constructor(statucCode, message) {
    super(message);
    this.statucCode = statucCode;
    this.status = statucCode.toString().startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
};
