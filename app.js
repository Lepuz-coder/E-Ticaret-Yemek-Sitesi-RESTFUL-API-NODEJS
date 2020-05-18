const express = require('express');
const morgan = require('morgan');

const errorController = require('./controllers/errorController');
const AppError = require('./utils/appError');

const userRouter = require('./routes/userRoutes');

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(404, `This url cant found: ${req.originalUrl}`));
});

app.use(errorController);

module.exports = app;
