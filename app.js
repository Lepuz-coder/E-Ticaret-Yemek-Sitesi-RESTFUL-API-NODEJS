const express = require('express');
const path = require('path');
const morgan = require('morgan');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const multer = require('multer');

const upload = multer();

const errorController = require('./controllers/errorController');
const AppError = require('./utils/appError');

const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const yemekRouter = require('./routes/yemekRoutes');
const yorumRouter = require('./routes/yorumRoutes');
const sepetRouter = require('./routes/sepetRoutes');
const begenRouter = require('./routes/begenRoutes');
const viewRouter = require('./routes/viewRouter');

const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
//fieldsIsım[name] = 'blabla' filedsIsım: { name: 'blabla }

//GÜVENLİK ÖNLEMLERİ:
const limiter = rateLimiter({
  max: 500,
  windowMs: 1000 * 60 * 30,
});

app.use('/api', limiter);
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

//Render işlemleri:
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use('/', viewRouter);

app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/yemekler', yemekRouter);
app.use('/api/v1/yorumlar', yorumRouter);
app.use('/api/v1/sepet', sepetRouter);
app.use('/api/v1/begen', begenRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`This url cant found: ${req.originalUrl}`, 404));
});

app.use(errorController);

module.exports = app;
