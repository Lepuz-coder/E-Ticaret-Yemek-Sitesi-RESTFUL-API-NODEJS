const express = require('express');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const yemekRoutes = require('./yemekRoutes');

const router = express.Router();

router.use('/:kulId/yemekler', yemekRoutes);

router.use(authController.protect);

router.post('/beni-guncelle', userController.beniGuncelle);
router.post('/sifremi-degis', userController.sifremiDegistir);

router.use(authController.izinliRoller('admin'));

router
  .route('/')
  .post(userController.kullaniciOlustur)
  .get(userController.kullanicilariAl);

router
  .route('/:id')
  .patch(userController.kullaniciGuncelle)
  .get(userController.kullaniciAl)
  .delete(userController.kullaniciSil);

module.exports = router;
