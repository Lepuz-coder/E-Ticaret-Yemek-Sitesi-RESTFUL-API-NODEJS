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
router.get('/urunler/:sayfa', viewController.urunlerGoster);
router.get('/kayit', viewController.kayitGoster);
router.get('/giris', viewController.girisGoster);
router.get('/urun-ekle', viewController.urunEkleGoster);

module.exports = router;
