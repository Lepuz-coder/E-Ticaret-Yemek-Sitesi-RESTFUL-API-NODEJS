const Yemek = require('../models/yemekModel');
const Begen = require('../models/begenModel');
const Sepet = require('../models/sepetModel');
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

  const favoriler = (
    await Begen.findOne({ kullanici: req.user.id }).populate({
      path: 'begenilenler.begenilen',
      select: 'aciklama resim fiyat ad',
    })
  ).begenilenler;

  res.status(200).render('favoriler', {
    title: 'Favoriler',
    kapakBaslik: 'FAVORİLER',
    favoriler,
  });
});

// TODO
exports.sepet = hataYakala(async (req, res, next) => {
  res.status(200).render('sepet', {
    title: 'Sepetim',
    kapakBaslik: 'Sepet',
  });
});

exports.urun = hataYakala(async (req, res, next) => {
  const urun = await Yemek.findById(req.params.id);

  res.status(200).render('urun', {
    title: urun.ad,
    kapakBaslik: urun.ad,
    urun,
  });
});
