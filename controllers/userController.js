/* eslint-disable camelcase */
const User = require('../models/userModel');
const hataYakala = require('../utils/hataYakala');
const ApiEklenti = require('../utils/apiEklenti');
const AppError = require('../utils/appError');
const tokenOlustur = require('../utils/tokenOlustur');

const objeFiltre = (obj, ...filtre) => {
  Object.keys(obj).forEach((el) => {
    if (filtre.includes(el)) delete obj[el];
  });
  return obj;
};

//GET ALL USER

exports.kullanicilariAl = hataYakala(async (req, res, next) => {
  /*Linkte kullanıcıları belirli özelliklerine göre aramalar eklenicek
   * field ile name=Lepuz gibi
   */
  const apiEklenti = new ApiEklenti(User.find(), req.query)
    .parcalaraAyir()
    .fieldArama()
    .sayfalama()
    .sutun()
    .siralama();

  const kullanicilar = await apiEklenti.query;

  res.status(200).json({
    status: 'success',
    sayi: kullanicilar.length,
    data: {
      kullanicilar,
    },
  });
});

//CREATE USER
exports.kullaniciOlustur = hataYakala(async (req, res, next) => {
  const newUser = await User.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      newUser,
    },
  });
});

//UPDATE USER
exports.kullaniciGuncelle = hataYakala(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (req.body.kullanici_ad) user.kullanici_ad = req.body.kullanici_ad;

  if (req.body.email) user.email = req.body.email;

  if (req.body.sifre) user.sifre = req.body.sifre;

  await user.save({
    validateBeforeSave: false,
  });

  res.status(200).json({
    status: 'success',
    data: {
      kullanici: user,
    },
  });
});

//Kullanıcı Al
exports.kullaniciAl = hataYakala(async (req, res, next) => {
  const kullanici = await User.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      kullanici,
    },
  });
});

//Kulanıcı Sil
exports.kullaniciSil = hataYakala(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

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
