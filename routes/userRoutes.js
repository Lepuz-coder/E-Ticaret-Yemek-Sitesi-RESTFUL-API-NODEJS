const express = require('express');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);
router.post('/beni-guncelle', userController.beniGuncelle);

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
