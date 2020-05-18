const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

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
