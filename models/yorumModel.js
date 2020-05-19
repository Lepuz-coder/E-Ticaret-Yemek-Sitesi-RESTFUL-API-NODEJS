const mongoose = require('mongoose');

const yorumSchema = new mongoose.Schema({
  puan: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: [true, 'Puanlama yapmadan yorum gönderemezsiniz.'],
  },
  yorum: {
    type: String,
    maxlength: [150, 'Bir yorum en fazla 150 karakter olabilir.'],
  },
  yemek_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Yemek',
    required: [true, 'Yorumlar bir yemeğe ait olmalıdır.'],
  },
  kullanici_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Yorumlar bir kullanıcıya ait olmalıdır.'],
  },
});

const Yorum = mongoose.model('Yorum', yorumSchema);

module.exports = Yorum;
