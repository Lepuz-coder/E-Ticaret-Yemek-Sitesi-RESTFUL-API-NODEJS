const express = require('express');
const morgan = require('morgan');

const errorController = require('./controllers/errorController');
const AppError = require('./utils/appError');

const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const yemekRouter = require('./routes/yemekRoutes');
const yorumRouter = require('./routes/yorumRoutes');

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/yemekler', yemekRouter);
app.use('/api/v1/yorumlar', yorumRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`This url cant found: ${req.originalUrl}`, 404));
});

app.use(errorController);

module.exports = app;
