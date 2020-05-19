const express = require('express');
const yemekController = require('../controllers/yemekController');
const authController = require('../controllers/authController');

const router = express.Router();

//Admin İçin Routingler :

router
  .route('/')
  .post(
    authController.protect,
    yemekController.yemekOlusturmaIzin,
    yemekController.yemekOlustur
  ) //Satıcı buraya erişebilir
  .get(yemekController.yemekleriAl); //Herkes buraya erişebilir

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
