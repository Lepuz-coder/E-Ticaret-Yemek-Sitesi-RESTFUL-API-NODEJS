const express = require('express');
const yorumController = require('../controllers/yorumController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.get(
  '/me',
  authController.protect,
  yorumController.meYorumlarFilter,
  yorumController.yorumlariAl
);

router
  .route('/')
  .get(yorumController.yorumlarAlNested, yorumController.yorumlariAl)
  .post(
    authController.protect,
    authController.emailKontrol,
    yorumController.yorumOlusturNested,
    yorumController.yorumEkleDuzenle,
    yorumController.yorumEkle
  );

router
  .route('/:id')
  .get(yorumController.yorumAl)
  .delete(
    authController.protect,
    yorumController.yorumIdProtect,
    yorumController.yorumSil
  )
  .patch(
    authController.protect,
    yorumController.yorumIdProtect,
    yorumController.yorumGuncelle
  );

module.exports = router;
