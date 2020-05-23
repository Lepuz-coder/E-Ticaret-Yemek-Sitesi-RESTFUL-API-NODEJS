const Yemek = require('../models/yemekModel');
const Begen = require('../models/begenModel');
const hataYakala = require('../utils/hataYakala');

exports.anasayfaMiddleware = (req, res, next) => {
  req.params.sayfa = 1;
  next();
};

exports.urunlerGoster = hataYakala(async (req, res, next) => {
  let filter;

  req.filter ? (filter = req.filter) : (filter = {});

  if (!req.params.sayfa) req.params.sayfa = 1;

  const yemekler = await Yemek.find(filter)
    .skip((req.params.sayfa - 1) * 8)
    .limit(8);
  const toplam = Math.ceil((await Yemek.find(filter)).length / 8);

  res.locals.sayfa = req.params.sayfa;

  if (req.user) {
    const begenilerDb = await Begen.findOne({ kullanici: req.user.id });
    const begeniler = begenilerDb.begenilenler.map((el) => el.begenilen);
    res.locals.begeniler = begeniler;
    console.log(begeniler);
  }

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

exports.favoriler = hataYakala(async (req, res, next) => {
  if (!req.params.sayfa) req.params.sayfa = 1;

  const begenilerDb = await Begen.findOne({ kullanici: req.user.id })
    .populate('begenilenler.begenilen')
    .skip((req.params.sayfa - 1) * 8)
    .limit(8);

  const tumBegeniler = (await Begen.findOne({ kullanici: req.user.id }))
    .begenilenler;

  res.locals.begeniler = tumBegeniler.map((el) => el.begenilen);
  const toplam = Math.ceil(tumBegeniler.length / 8);
  console.log(toplam);

  const begeniler = begenilerDb.begenilenler.map((el) => el.begenilen);

  res.locals.favori = true;

  res.status(200).render('urunler', {
    kapakBaslik: 'Favoriler',
    title: 'Favoriler',
    toplam,
    yemekler: begeniler,
    sayfa: req.params.sayfa,
  });
});
