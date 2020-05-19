const mongoose = require('mongoose');

const sepetSchema = new mongoose.Schema({
  kullanici: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  urunler: [
    {
      yemek: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Yemek',
      },
      sayi: Number,
    },
  ],
});

const Sepet = mongoose.model('Sepet', sepetSchema);

module.exports = Sepet;
