const express = require('express');
const viewController = require('../controllers/viewController');

const router = express.Router();

router.get('/urunler', viewController.urunlerGoster);
router.get('/kayit', viewController.girisGoster);

module.exports = router;
