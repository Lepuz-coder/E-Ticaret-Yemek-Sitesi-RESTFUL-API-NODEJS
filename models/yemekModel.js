const mongoose = require('mongoose');

const yemekSchema = new mongoose.Schema({
  ad: {
    type: String,
    maxlength: [25, 'Bir yemek adı en fazla 25 karakter olabilir.'],
    required: [true, 'Yemek adı girilmesi zorunludurç'],
  },
  fiyat: {
    type: Number,
    required: [true, 'Yemeğin fiyatı olmak zorunludur'],
    min: [
      1,
      'Her satışa 0.99 kuruş komisyon konulduğu için en az 1 tl olmak zorunludur',
    ],
  },
  aciklama: {
    type: String,
    required: [true, 'Yemek ile alakalı açıklama koyulması zorunludur'],
  },
  satis: {
    type: Number,
    default: 0,
  },
  stok: {
    type: Number,
    required: [true, 'Stoğunuzda bulunan miktarın girilmesi zorunludur'],
  },
  puan_sayi: {
    type: Number,
    default: 0,
  },
  puan_ortalama: {
    type: Number,
    default: 0,
  },
  tipler: {
    type: [String],
    required: [true, 'Yemeğiniz en az bir tipi olmalıdır'],
  },
  resim: {
    type: String,
  },
  satan_kullanici: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Yemek = mongoose.model('Yemek', yemekSchema);

module.exports = Yemek;
