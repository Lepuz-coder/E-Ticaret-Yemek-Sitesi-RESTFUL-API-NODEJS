const express = require('express');
const sepetController = require('../controllers/sepetController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.route('/').get(sepetController.getir);

router
  .route('/:id')
  .post(sepetController.sepeteEkle)
  .patch(sepetController.sepettekiUrunuEksilt)
  .delete(sepetController.sepettenUrunCikart);

module.exports = router;
