const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/giris', authController.girisYap);
router.post('/kayit', authController.kayitOl);

module.exports = router;
