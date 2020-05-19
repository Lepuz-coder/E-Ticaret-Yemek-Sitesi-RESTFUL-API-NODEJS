const Sepet = require('../models/sepetModel');
const handlerFactory = require('../utils/handlerFactory');
const hataYakala = require('../utils/hataYakala');

exports.ekle = handlerFactory.olustur(Sepet);
exports.getir = handlerFactory.hepsiniAl(Sepet, 'sepet');

exports.guncelle = async (req, res, next) => {
  console.log(req.params.id);
  const food = await Sepet.findOneAndUpdate(
    {
      'urunler._id': '5ec423b151c8051a943b93ad',
    },
    {
      $inc: { 'urunler.$.sayi': 1 },
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    status: 'success',
    food,
  });
};

exports.sepeteEkle = hataYakala(async (req, res, next) => {
  let sepet;
  const urun = await Sepet.findOne({
    kullanici: req.user._id,
    'urunler.yemek': req.params.id,
  });

  if (urun) {
    sepet = await Sepet.findOneAndUpdate(
      { kullanici: req.user._id, 'urunler.yemek': req.params.id },
      { $inc: { 'urunler.$.sayi': 1 } },
      { new: true }
    );
  } else {
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
