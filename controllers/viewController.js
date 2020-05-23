const Yemek = require('../models/yemekModel');
const hataYakala = require('../utils/hataYakala');

exports.anasayfaMiddleware = (req, res, next) => {
  req.params.sayfa = 1;
  next();
};

exports.urunlerGoster = hataYakala(async (req, res, next) => {
  let filter;

  req.filter ? (filter = req.filter) : (filter = {});

  const yemekler = await Yemek.find(filter)
    .skip((req.params.sayfa - 1) * 8)
    .limit(8);
  const toplam = Math.ceil((await Yemek.find(filter)).length / 8);

  res.locals.sayfa = req.params.sayfa;

  res.status(200).render('urunler', {
    kapakBaslik: 'ÜRÜNLER',
    title: 'Ürünler',
    toplam,
    yemekler,
  });
});

exports.kayitGoster = (req, res, next) => {
  res.status(200).render('kayit', {
    kapakBaslik: 'Kayıt Ol',
    title: 'Kayıt',
  });
};

exports.girisGoster = (req, res, next) => {
  res.status(200).render('giris', {
    kapakBaslik: 'Giriş Yap',
    title: 'Giris',
  });
};

exports.urunEkleGoster = (req, res, next) => {
  res.status(200).render('urun_ekle', {
    kapakBaslik: 'Yeni Ürün Ekle',
    title: 'Urun Ekle',
  });
};

exports.yemeklerim = hataYakala(async (req, res, next) => {
  req.filter = { satan_kullanici: req.user.id };
  next();
});
