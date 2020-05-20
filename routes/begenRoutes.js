const express = require('express');
const begenController = require('../controllers/begenController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/:id')
  .post(begenController.begenilenEkle)
  .delete(begenController.begenilenCikar);
//POST -> begenilen ekle, DELETE -> begenilen çıkar

router.route('/').get(begenController.begenilenleriGetir);
//GET-> begenilenleri getir, DELELTE -> tüm beğenilenleri sil

module.exports = router;
