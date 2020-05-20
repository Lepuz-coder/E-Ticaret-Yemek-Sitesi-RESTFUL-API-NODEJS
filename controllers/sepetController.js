/* eslint-disable eqeqeq */
const Sepet = require('../models/sepetModel');
const handlerFactory = require('../utils/handlerFactory');
const hataYakala = require('../utils/hataYakala');

//Kullanıcının sepetindeki ürünleri getirir
exports.getir = handlerFactory.hepsiniAl(Sepet, 'sepet');

//Sepete Bir Ürün Ekler, eğer ki o ürün zaten varsa sayısını bir artırır.
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

//Sepetten ürünü bir ekilstir. Eğer ki 0'a ulaştıysa siler
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

//Sepetten ürünü direk çıkarır.
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

exports.sepetiBoslat = hataYakala(async (req, res, next) => {
  const sepet = await Sepet.findOne({ kullanici: req.user.id });

  sepet.urunler.splice(0, sepet.urunler.length);
  await sepet.save();

  res.status(201).json({
    status: 'success',
    data: null,
  });
});
