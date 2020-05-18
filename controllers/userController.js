const User = require('../models/userModel');
const hataYakala = require('../utils/hataYakala');
const ApiEklenti = require('../utils/apiEklenti');

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
