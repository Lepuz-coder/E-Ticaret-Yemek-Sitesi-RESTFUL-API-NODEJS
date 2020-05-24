/* eslint-disable eqeqeq */
const Iyzipay = require('iyzipay');
const Sepet = require('../models/sepetModel');
const handlerFactory = require('../utils/handlerFactory');
const hataYakala = require('../utils/hataYakala');

const urunEkle = hataYakala(async (req, res, next) => {
  if (!req.params.sayi) req.params.sayi = 1;
  let sepet = await Sepet.findOne({
    kullanici: req.user.id,
    'urunler.yemek': req.params.id,
  });

  if (!sepet) {
    sepet = await Sepet.findOne({ kullanici: req.user.id });

    sepet.urunler.push({
      yemek: req.params.id,
      sayi: req.params.sayi,
    });
  } else {
    console.log(sepet.urunler);

    const index = sepet.urunler.findIndex((el) => el.yemek == req.params.id);
    sepet.urunler[index].sayi += parseInt(req.params.sayi);
  }

  await sepet.save();

  res.status(200).json({
    status: 'success',
    tip: 'Ekleme',
    sepet,
  });
});

const urunEksilt = async (sepet, index, res) => {
  if (sepet.urunler[index].sayi === 1) {
    sepet.urunler.splice(index, 1);
  } else {
    sepet.urunler[index].sayi -= 1;
  }

  await sepet.save();
  //Eğer ki sayi 0 sa o nested objeyi sil

  res.status(200).json({
    status: 'success',
    tip: 'Eksiltme',
    sepet: sepet.urunler,
  });
};

//Kullanıcının sepetindeki ürünleri getirir
exports.getir = handlerFactory.hepsiniAl(Sepet, 'sepet');

//Sepete Bir Ürün Ekler, eğer ki o ürün zaten varsa sayısını bir artırır.
exports.sepeteEkle = urunEkle;

//Sepetten ürünü bir ekilstir. Eğer ki 0'a ulaştıysa siler
exports.sepettekiUrunuEksilt = hataYakala(async (req, res, next) => {
  const sepet = await Sepet.findOne({ kullanici: req.user.id });
  const index = sepet.urunler.findIndex((el) => {
    return el.yemek == req.params.id;
  });

  urunEksilt(sepet, index, res);
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

exports.sepetToggle = hataYakala(async (req, res, next) => {
  const sepetIndex = await Sepet.findOne({ kullanici: req.user.id });
  const index = sepetIndex.urunler.findIndex((el) => {
    return el.yemek == req.params.id;
  });

  if (index === -1) {
    //Sepete ürün ekle
    urunEkle(req, res, next);
  } else {
    //Sepetten ürünü eksilt
    urunEksilt(sepetIndex, index, res);
  }
});

exports.sepetGuncelle = hataYakala(async (req, res, next) => {
  //Ürünler body'den array şeklinde sayısıyla beraber gelicek
  const sepet = await Sepet.findOne({ kullanici: req.user.id });

  req.body.urunler.forEach((el) => {
    const index = sepet.urunler.findIndex((cur) => el.id == cur.id);
    sepet.urunler[index].sayi = el.sayi;
  });

  await sepet.save();

  res.status(200).json({
    status: 'success',
    sepet,
  });
});

exports.getCheckoutSession = hataYakala(async (req, res, next) => {
  //1-)Kullanıcının sepetini al
  const sepet = await Sepet.findOne({ kullanici: req.user.id }).populate(
    'urunler.yemek'
  );
  const iyzipay = new Iyzipay({
    apiKey: 'sandbox-QeMIDb7JHhbGWPc9bI9n49STmDA3yokz',
    secretKey: 'sandbox-VIhdTDg4I3boyjjimf07rHh4GDdZIqtM',
    uri: 'https://sandbox-api.iyzipay.com',
  });

  const basketItems = [];
  let toplam = 0;
  sepet.urunler.forEach((el) => {
    for (let i = 1; i <= el.sayi; i += 1) {
      basketItems.push({
        id: el.yemek.id,
        name: el.yemek.ad,
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: `${el.yemek.fiyat}`,
        category1: 'Yemek',
      });
      toplam += el.yemek.fiyat;
    }
  });

  console.log(basketItems);

  const request = {
    locale: Iyzipay.LOCALE.TR,
    conversationId: '123456789',
    price: `${toplam}`,
    paidPrice: `${toplam}`,
    currency: Iyzipay.CURRENCY.TRY,
    basketId: 'B67832',
    paymentGroup: Iyzipay.PAYMENT_GROUP.LISTING,
    callbackUrl: 'http://127.0.0.1:3000/urunler',
    enabledInstallments: [2, 3, 6, 9],
    buyer: {
      id: req.user.id,
      name: req.user.kullanici_ad,
      surname: 'Yok',
      gsmNumber: '+905350000000',
      email: req.user.email,
      identityNumber: '74300864791',
      lastLoginDate: '2015-10-05 12:43:35',
      registrationDate: '2013-04-21 15:12:09',
      registrationAddress: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
      ip: '85.34.78.112',
      city: 'Istanbul',
      country: 'Turkey',
      zipCode: '34732',
    },
    shippingAddress: {
      contactName: 'Jane Doe',
      city: 'Istanbul',
      country: 'Turkey',
      address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
      zipCode: '34742',
    },
    billingAddress: {
      contactName: 'Jane Doe',
      city: 'Istanbul',
      country: 'Turkey',
      address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
      zipCode: '34742',
    },
    basketItems,
  };
  iyzipay.checkoutFormInitialize.create(request, function (err, result) {
    //console.log(result);
    console.log(err);
    console.log(result);
    const form = `${result.checkoutFormContent}<div id="iyzipay-checkout-form" class="responsive"></div>`;
    res.status(200).json({
      status: 'success',
      form,
    });
  });
});
