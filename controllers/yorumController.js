const Yorum = require('../models/yorumModel');
const handlerFactory = require('../utils/handlerFactory');
const hataYakala = require('../utils/hataYakala');
const AppError = require('../utils/appError');

exports.yorumlariAl = handlerFactory.hepsiniAl(Yorum);
exports.yorumEkle = handlerFactory.olustur(Yorum);
exports.yorumSil = handlerFactory.sil(Yorum);
exports.yorumGuncelle = handlerFactory.guncelle(Yorum);
exports.yorumAl = handlerFactory.birTaneAl(
  Yorum,
  { path: 'kullanici_id', select: 'kullanici_ad' },
  { path: 'yemek_id' }
);

exports.yorumEkleDuzenle = (req, res, next) => {
  if (req.rol !== 'admin') req.body.kullanici_id = req.user.id;
  next();
};

exports.yorumIdProtect = hataYakala(async (req, res, next) => {
  if (req.rol === 'admin') return next();

  const yorum = await Yorum.findOne({
    kullanici_id: req.user.id,
    _id: req.params.id,
  });

  if (!yorum) {
    return next(
      new AppError(
        'Silmeye çalıştığınız ya size ait değil ya da artık yok',
        404
      )
    );
  }

  next();
});

exports.yorumOlusturNested = (req, res, next) => {
  if (!req.params.yemekId) return next();

  req.body.yemek_id = req.params.yemekId;
  next();
};

exports.yorumlarAlNested = (req, res, next) => {
  if (!req.params.yemekId) return next();

  req.filter = { yemek_id: req.params.yemekId };
  next();
};

exports.meYorumlarFilter = (req, res, next) => {
  req.filter = { kullanici_id: req.user.id };
  next();
};
