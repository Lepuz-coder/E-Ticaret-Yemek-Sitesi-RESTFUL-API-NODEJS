const developmentError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    err,
  });
};

const productionError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

const validationError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.errors,
  });
};

const jsonWebTokenError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

const tokenExpiredError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: 'Bu tokenın süresi geçmiş',
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status =
    err.status || err.statusCode.toString().startsWith('4') ? 'fail' : 'error';

  if (process.env.NODE_ENV === 'development') {
    return developmentError(err, res);
  }

  if (err.name === 'ValidationError') return validationError(err, res);
  if (err.name === 'JsonWebTokenError') return jsonWebTokenError(err, res);
  if (err.name === 'TokenExpiredError') return tokenExpiredError(err, res);

  productionError(err, res);
};
