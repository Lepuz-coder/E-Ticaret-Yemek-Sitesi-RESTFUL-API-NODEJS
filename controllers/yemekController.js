const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/userModel');
const Yemek = require('../models/yemekModel');
const handlerFactory = require('../utils/handlerFactory');
const AppError = require('../utils/appError');
const hataYakala = require('../utils/hataYakala');

const multerStorage = multer.memoryStorage();
//Yukarıdaki gibi direk server içinde dosyayı saklamak yerine hafızada(arabellekte) saklanmasını sağladık. Arabellek = buffer. Serverda
//saklama işlemi sharp fonksiyonu ile yapılacaktır.

//Dosyanın tip gibi özelliklerinin filtrelenmesini sağlıyoruz.
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Lütfen resim dosyası ekleyiniz!', 400));
  }
};

//Yukarıda belirlediğimiz ayarları multer fonksiyonunun içine ekliyoruz
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.resizeUserPhoto = hataYakala(async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `kullanici-${req.user._id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/resimler/yemekler/${req.file.filename}`);

  next();
});

exports.uploadUserPhoto = upload.single('resim');

exports.yemekleriAl = handlerFactory.hepsiniAl(Yemek);
exports.yemekAl = handlerFactory.birTaneAl(Yemek, {
  path: 'satan_kullanici',
  select: 'kullanici_ad',
});
exports.yemekOlustur = handlerFactory.olustur(Yemek);
exports.yemekGuncelle = handlerFactory.guncelle(
  Yemek,
  'puan_sayi',
  'puan_ortalama',
  'satis'
);
exports.yemekSil = handlerFactory.sil(Yemek);

exports.benimYemekler = (req, res, next) => {
  req.filter = { satan_kullanici: req.user.id };
  next();
};

exports.nestedYemekler = (req, res, next) => {
  if (req.params.kulId) req.filter = { satan_kullanici: req.params.kulId };
  next();
};

//Satıcıların sadece kendisine ait bir yemek oluşturmasını sağlayan middleware
exports.yemekOlusturmaIzin = async (req, res, next) => {
  if (req.user.rol === 'admin') {
    return next();
  }

  if (req.user.rol !== 'satici') {
    req.user.rol = 'satici';
    await User.findByIdAndUpdate(req.user.id, {
      rol: 'satici',
    });
  }

  req.body.satan_kullanici = req.user.id;
  next();
};

exports.yemekDosyaYuklemeAyari = (req, res, next) => {
  if (req.file) req.body.resim = req.file.filename;
  if (req.body.tipler) req.body.tipler = JSON.parse(req.body.tipler);
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

exports.meYemeklerFilter = (req, res, next) => {
  req.filter = { satan_kullanici: req.user.id };
  next();
};
