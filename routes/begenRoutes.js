const express = require('express');
const begenController = require('../controllers/begenController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(begenController.begenilenleriGetir)
  .delete(begenController.tumBegenilenleriKaldir);

router
  .route('/:id')
  .post(begenController.begenilenEkle)
  .delete(begenController.begenilenCikar);

router.post('/toggle/:id', begenController.begenToggle);

module.exports = router;
