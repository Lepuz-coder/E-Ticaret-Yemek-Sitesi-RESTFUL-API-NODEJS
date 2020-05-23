const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.girisYaptiMi);

router.get(
  '/',
  viewController.anasayfaMiddleware,
  viewController.urunlerGoster
);
router.get('/urunler/:sayfa?', viewController.urunlerGoster);
router.get('/kayit', viewController.kayitGoster);
router.get('/giris', viewController.girisGoster);
router.get('/urun-ekle', authController.protect, viewController.urunEkleGoster);
router.get(
  '/urunlerim/:sayfa',
  authController.protect,
  viewController.yemeklerim,
  viewController.urunlerGoster
);
router.get(
  '/favoriler/:sayfa?',
  authController.protect,
  viewController.favoriler
);
router.get('/sepetim', authController.protect, viewController.sepet);

module.exports = router;
