const validator = require('validator');
const util = require('util');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/userModel');
const hataYakala = require('../utils/hataYakala');
const AppError = require('../utils/appError');
const tokenOlustur = require('../utils/tokenOlustur');
const Email = require('../utils/email');

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

  req.user = user;

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

  //3-)Kullanıcıya email verify kodu gönder
  const verifyToken = newUser.emailTokenAndSend('verify');

  const sendMail = new Email(
    newUser,
    `${req.protocol}://${req.get('host')}/auth/emailOnayla/${verifyToken}`
  );
  await sendMail.emailVerifyTokenGonder();
  await newUser.save({ validateBeforeSave: false });

  //4-)Token oluşturulacak ve oluşturulan token cevap olarak verilecek
  const token = tokenOlustur(newUser._id);

  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.emailTokenKontrol = hataYakala(async (req, res, next) => {
  const { token } = req.params;
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const curUser = await User.findOne({ emailVerifyCode: hashedToken });

  if (!curUser) {
    return next(new AppError('Geçersiz token!', 400));
  }

  curUser.emailVerifyCode = undefined;
  curUser.emailVerify = true;
  await curUser.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    message: 'Email onaylanmıştır',
    data: {
      curUser,
    },
  });
});

exports.sifreUnuttum = hataYakala(async (req, res, next) => {
  //1-)Emailini al
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return next(new AppError('Bu emaile sahip bir kullanıcı yok'));

  //2-)Emaile token gönder ve bu tokenı veritabanına kaydet

  const token = user.emailTokenAndSend('password');

  await user.save({ validateBeforeSave: false });

  const mailGonder = new Email(
    user,
    `${req.protocol}://${req.get('host')}/api/v1/auth/sifreSifirla/${token}`
  );

  await mailGonder.emailSifreUnuttumTokenGonder();

  res.status(200).json({
    status: 'success',
    message: 'Sifirlama linki maile gönderilmiştir',
  });
});

exports.sifreSifirla = hataYakala(async (req, res, next) => {
  const { sifre, sifreTekrar } = req.body;
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  console.log(hashedToken);
  //1-)Token'a sahip bir kullanıcı var mı
  const user = await User.findOne({ passwordResetCode: hashedToken });
  if (!user) {
    return next(new AppError('Geçersiz Token', 404));
  }

  //2-)Şifre sıfırlama işlemi yapılacak ve token silinecek
  user.sifre = sifre;
  user.sifreTekrar = sifreTekrar;
  user.passwordResetCode = undefined;
  await user.save();

  //3-)Kullanıcıyı giriş yaptırıp jwt token gönderilecek
  const token = tokenOlustur(user._id);

  res.status(200).json({
    status: 'success',
    token,
  });
});

/**
 * kullanıcı güncelle /me (Sadece email ve kullanıcı adı)
 * Kullanıcı şifre değiş /me
 */
