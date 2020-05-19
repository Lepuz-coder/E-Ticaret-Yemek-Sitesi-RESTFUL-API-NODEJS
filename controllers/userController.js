/* eslint-disable camelcase */
const User = require('../models/userModel');
const hataYakala = require('../utils/hataYakala');
const ApiEklenti = require('../utils/apiEklenti');
const AppError = require('../utils/appError');
const tokenOlustur = require('../utils/tokenOlustur');
const handlerFactory = require('../utils/handlerFactory');

const objeFiltre = (obj, ...filtre) => {
  Object.keys(obj).forEach((el) => {
    if (filtre.includes(el)) delete obj[el];
  });
  return obj;
};

exports.beniGuncelle = hataYakala(async (req, res, next) => {
  const body = objeFiltre(
    req.body,
    'sifre',
    'sifreTekrar',
    'sifreDegistirmeTarih',
    'emailVerify',
    'rol'
  );

  if (!body.email && !body.kullanici_ad) {
    return next(
      new AppError('Email veya kullanıcı adından en az biri girilmelidir!', 400)
    );
  }

  const newUser = await User.findByIdAndUpdate(req.user.id, body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    user: newUser,
  });
});

exports.sifremiDegistir = hataYakala(async (req, res, next) => {
  const { sifre, sifreTekrar } = req.body;

  const user = await User.findById(req.user.id);

  user.sifre = sifre;
  user.sifreTekrar = sifreTekrar;
  await user.save();

  const token = tokenOlustur(user.id);

  res.status(200).json({
    status: 'success',
    token,
  });
});

//CRUD İŞLEMLERİ :
exports.kullanicilariAl = handlerFactory.hepsiniAl(User);
exports.kullaniciOlustur = handlerFactory.olustur(User);
exports.kullaniciGuncelle = handlerFactory.guncelle(User);
exports.kullaniciAl = handlerFactory.birTaneAl(User);
exports.kullaniciSil = handlerFactory.sil(User);
