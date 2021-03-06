const express = require('express');
const yemekController = require('../controllers/yemekController');
const authController = require('../controllers/authController');
const yorumRouter = require('./yorumRoutes');

const router = express.Router({ mergeParams: true });

router.use('/:yemekId/yorumlar', yorumRouter);
router.get(
  '/me',
  authController.protect,
  yemekController.benimYemekler,
  yemekController.yemekleriAl
);

//Admin İçin Routingler :
router
  .route('/')
  .post(
    authController.protect,
    yemekController.uploadUserPhoto,
    yemekController.resizeUserPhoto,
    yemekController.yemekDosyaYuklemeAyari,
    yemekController.yemekOlusturmaIzin,
    yemekController.yemekOlustur
  ) //Satıcı buraya erişebilir
  .get(yemekController.nestedYemekler, yemekController.yemekleriAl); //Herkes buraya erişebilir

router
  .route('/:id')
  .get(yemekController.yemekAl) //Herkes buraya erişebilir
  .patch(
    authController.protect,
    yemekController.yemekIdIzin,
    yemekController.yemekGuncelle
  ) //Satıcı buraya erişebilir
  .delete(
    authController.protect,
    yemekController.yemekIdIzin,
    yemekController.yemekSil
  ); //Satıcı buraya erişebilir

module.exports = router;
