/* eslint-disable eqeqeq */
const Sepet = require('../models/sepetModel');
const handlerFactory = require('../utils/handlerFactory');
const hataYakala = require('../utils/hataYakala');

exports.ekle = handlerFactory.olustur(Sepet);

exports.getir = handlerFactory.hepsiniAl(Sepet, 'sepet');

exports.sepeteEkle = hataYakala(async (req, res, next) => {
  let sepet = await Sepet.findOne({
    kullanici: req.user.id,
    'urunler.yemek': req.params.id,
  });

  if (!sepet) {
    sepet = await Sepet.findOne({ kullanici: req.user.id });

    sepet.urunler.push({
      yemek: req.params.id,
      sayi: 1,
    });
  } else {
    console.log(sepet.urunler);

    const index = sepet.urunler.findIndex((el) => el.yemek == req.params.id);
    sepet.urunler[index].sayi += 1;
  }

  await sepet.save();

  res.status(200).json({
    status: 'success',
    sepet,
  });
});

exports.sepettekiUrunuEksilt = hataYakala(async (req, res, next) => {
  const sepet = await Sepet.findOne({ kullanici: req.user.id });
  const index = sepet.urunler.findIndex((el) => {
    return el.yemek == req.params.id;
  });

  if (sepet.urunler[index].sayi === 1) {
    sepet.urunler.splice(index, 1);
  } else {
    sepet.urunler[index].sayi -= 1;
  }
  console.log(sepet.urunler);

  await sepet.save();
  //Eğer ki sayi 0 sa o nested objeyi sil

  res.status(200).json({
    status: 'success',
    sepet: sepet.urunler,
  });
});

exports.sepettenUrunCikart = hataYakala(async (req, res, next) => {
  const sepet = await Sepet.findOne({ kullanici: req.user.id });

  const index = sepet.urunler.findIndex((el) => el.yemek == req.params.id);

  sepet.urunler.splice(index, 1);

  await sepet.save();

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
