/* eslint-disable eqeqeq */
const Sepet = require('../models/sepetModel');
const handlerFactory = require('../utils/handlerFactory');
const hataYakala = require('../utils/hataYakala');

exports.ekle = handlerFactory.olustur(Sepet);

exports.getir = handlerFactory.hepsiniAl(Sepet, 'sepet');

exports.sepeteEkle = hataYakala(async (req, res, next) => {
  let sepet;

  sepet = await Sepet.findOneAndUpdate(
    { kullanici: req.user._id, 'urunler.yemek': req.params.id },
    { $inc: { 'urunler.$.sayi': 1 } },
    { new: true }
  );

  if (!sepet) {
    sepet = await Sepet.findOneAndUpdate(
      { kullanici: req.user._id },
      {
        $push: {
          urunler: {
            yemek: req.params.id,
            sayi: 1,
          },
        },
      },
      {
        new: true,
      }
    );
  }

  res.status(200).json({
    status: 'success',
    sepet,
  });
});

exports.sepettenCikar = hataYakala(async (req, res, next) => {
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
