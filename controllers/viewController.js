const Yemek = require('../models/yemekModel');
const hataYakala = require('../utils/hataYakala');

exports.urunlerGoster = hataYakala(async (req, res, next) => {
  const yemekler = await Yemek.find()
    .skip((req.params.sayfa - 1) * 8)
    .limit(8);
  const toplam = Math.ceil((await Yemek.find()).length / 8);

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
