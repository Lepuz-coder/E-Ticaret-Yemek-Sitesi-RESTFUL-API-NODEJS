const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.girisYaptiMi);

router.get('/urunler', viewController.urunlerGoster);
router.get('/kayit', viewController.kayitGoster);
router.get('/giris', viewController.girisGoster);

module.exports = router;
