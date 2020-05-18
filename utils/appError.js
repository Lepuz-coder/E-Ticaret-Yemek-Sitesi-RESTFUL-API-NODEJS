module.exports = class AppError extends Error {
  constructor(message, statucCode) {
    super(message);
    this.statucCode = statucCode;
    this.status = statucCode.toString().startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
};
