const Yemek = require('../models/yemekModel');
const handlerFactory = require('../utils/handlerFactory');
const AppError = require('../utils/appError');
const hataYakala = require('../utils/hataYakala');

exports.yemekleriAl = handlerFactory.hepsiniAl(Yemek);
exports.yemekAl = handlerFactory.birTaneAl(Yemek, {
  path: 'satan_kullanici',
  select: 'kullanici_ad',
});
exports.yemekOlustur = handlerFactory.olustur(Yemek);
exports.yemekGuncelle = handlerFactory.guncelle(Yemek);
exports.yemekSil = handlerFactory.sil(Yemek);

exports.nestedYemekler = (req, res, next) => {
  if (req.params.kulId) req.filter = { satan_kullanici: req.params.kulId };
  next();
};

//Satıcıların sadece kendisine ait bir yemek oluşturmasını sağlayan middleware
exports.yemekOlusturmaIzin = (req, res, next) => {
  if (req.user.rol === 'admin') {
    return next();
  }

  if (req.user.rol !== 'satici') {
    return next(new AppError('Buraya erişiminize izin yok', 400));
  }

  req.body.satan_kullanici = req.user.id;
  next();
};

//Satıcıların sadece kendine ait yemekleri silmesi veya güncellemesini sağlayan middleware
exports.yemekIdIzin = hataYakala(async (req, res, next) => {
  if (req.user.rol === 'admin') {
    return next();
  }

  if (req.user.rol !== 'satici') {
    return next(new AppError('Buraya erişiminize izin yok', 400));
  }

  const yemek = await Yemek.findOne({
    _id: req.params.id,
    satan_kullanici: req.user.id,
  });
  if (!yemek) {
    return next(
      new AppError(
        'Başka kullanıcıların yemeklerini değiştirmeye izniniz yok',
        400
      )
    );
  }
  req.body.satan_kullanici = req.user.id;
  next();
});
