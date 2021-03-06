const express = require('express');
const sepetController = require('../controllers/sepetController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(sepetController.getir)
  .delete(sepetController.sepetiBoslat);

router
  .route('/:id/:sayi?')
  .post(sepetController.sepeteEkle)
  .patch(sepetController.sepettekiUrunuEksilt)
  .delete(sepetController.sepettenUrunCikart);

router.post('/toggle/urun/:id', sepetController.sepetToggle);

router.put('/guncelle', sepetController.sepetGuncelle);
router.post('/checkout/session/update', sepetController.getCheckoutSession);

module.exports = router;
