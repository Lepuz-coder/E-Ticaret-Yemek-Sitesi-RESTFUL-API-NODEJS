const mongoose = require('mongoose');

const begenSchema = new mongoose.Schema({
  kullanici: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  begenilenler: [
    {
      begenilen: { type: mongoose.Schema.Types.ObjectId, ref: 'Yemek' },
    },
  ],
});

const Begen = mongoose.model('Begen', begenSchema);

module.exports = Begen;
