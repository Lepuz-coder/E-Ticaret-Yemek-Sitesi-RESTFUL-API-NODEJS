const express = require('express');
const sepetController = require('../controllers/sepetController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/').patch(sepetController.ekle);
router.route('/').get(sepetController.getir);

router.route('/:id').post(authController.protect, sepetController.sepeteEkle);

module.exports = router;
