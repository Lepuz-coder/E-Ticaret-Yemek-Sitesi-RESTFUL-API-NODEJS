const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;

const userSchema = new Schema({
  kullanici_ad: {
    type: String,
    maxlength: [15, 'Karakter uzunluğu en fazla 15 olabilir'],
    minlength: [5, 'Karakter uzunluğu en az 5 olabilir'],
    required: [true, 'Kullanıcı adının girilmesi zorunludur'],
  },
  email: {
    type: String,
    required: [true, 'Email girilmesi zorunludur'],
    validate: [validator.isEmail, 'Lütfen geçerli bir email adresi giriniz'],
  },
  sifre: {
    type: String,
    min: [8, 'Şifre uzunluğunuz en az 8 karakter olmalıdır'],
    required: [true, 'Şifre alanını doldurmak zorunludur'],
  },
  sifreTekrar: {
    type: String,
    validate: {
      validator: function (v) {
        return this.sifre === v;
      },
      message: 'Şifreleriniz aynı olmalıdır',
    },
    required: [true, 'Şifre tekrarın doldurulması zorunludur'],
  },
  rol: {
    type: String,
    enum: ['kullanici', 'satici', 'admin'],
    default: 'kullanici',
  },
  /**
   * Sepet, Favoriler, eklenicek
   */
});

userSchema.pre('save', function (next) {
  this.sifreTekrar = undefined;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
