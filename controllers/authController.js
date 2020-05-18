const validator = require('validator');
const util = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const hataYakala = require('../utils/hataYakala');
const AppError = require('../utils/appError');
const tokenOlustur = require('../utils/tokenOlustur');

exports.protect = hataYakala(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else {
    return next(new AppError('Buraya erişmek için lütfen giriş yapınız', 401));
  }

  const decoded = await util.promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );

  //1-)Bu tokena sahip kullanıcı hala var mı
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new AppError('Bu tokena sahip kullanıcı artık yok!', 401));
  }

  //2-)Kullanıcı bu tokendan sonra şifresini değiştirmiş mi
  if (user.sifreDegismisMi(decoded.iat)) {
    return next(
      new AppError('Kullanıcı bu tokendan sonra şifresini değiştirmiş', 401)
    );
  }

  next();
});

exports.girisYap = hataYakala(async (req, res, next) => {
  //isim_email
  // eslint-disable-next-line camelcase
  const { isim_email, sifre } = req.body;
  let user;
  if (validator.isEmail(req.body.isim_email)) {
    user = await User.findOne({ email: isim_email }).select('sifre');
  } else {
    user = await User.findOne({ kullanici_ad: isim_email }).select('sifre');
  }

  if (!user) {
    return next(new AppError('Bu email/isim ile bir kullanıcı yok', 401));
  }

  if (!(await user.sifreKarsilastir(sifre))) {
    return next(new AppError('Girmis oldugunuz sifre yanlis', 401));
  }

  const token = tokenOlustur(user._id);

  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.kayitOl = hataYakala(async (req, res, next) => {
  //1-)KullaniciAd, email, sifre alınacak.
  const { kullanici_ad, email, sifre, sifreTekrar } = req.body;

  //2-)Veritabanına kaydedilecek. Kaydedilirken aynı zamanda kontrol edilmiş olucaz.
  const newUser = await User.create({
    kullanici_ad,
    email,
    sifre,
    sifreTekrar,
  });

  //3-)Token oluşturulacak ve oluşturulan token cevap olarak verilecek
  const token = tokenOlustur(newUser._id);

  res.status(200).json({
    status: 'success',
    token,
  });
});
