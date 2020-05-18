const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/giris', authController.girisYap);
router.post('/kayit', authController.kayitOl);
router.get('/emailOnayla/:token', authController.emailTokenKontrol);
router.post('/sifreUnuttum', authController.sifreUnuttum);
router.post('/sifreSifirla/:token', authController.sifreSifirla);

module.exports = router;
