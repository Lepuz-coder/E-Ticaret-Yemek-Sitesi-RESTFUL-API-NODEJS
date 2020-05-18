const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const userSchema = new Schema({
  kullanici_ad: {
    type: String,
    maxlength: [15, 'Karakter uzunluğu en fazla 15 olabilir'],
    minlength: [5, 'Karakter uzunluğu en az 5 olabilir'],
    required: [true, 'Kullanıcı adının girilmesi zorunludur'],
    unique: [true, 'Bu kullanıcı adı kullanılıyor'],
  },
  email: {
    type: String,
    required: [true, 'Email girilmesi zorunludur'],
    validate: [validator.isEmail, 'Lütfen geçerli bir email adresi giriniz'],
    unique: [true, 'Bu email zaten kullanılıyor.'],
  },
  sifre: {
    type: String,
    min: [8, 'Şifre uzunluğunuz en az 8 karakter olmalıdır'],
    required: [true, 'Şifre alanını doldurmak zorunludur'],
    select: false,
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
  sifreDegistirmeTarih: Date,
  /**
   * Sepet, Favoriler, eklenicek
   */
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('sifre')) return next();

  this.sifreTekrar = undefined;
  console.log(this.sifre);
  const hashedSifre = await bcrypt.hash(this.sifre, 12);
  this.sifre = hashedSifre;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('sifre') || this.isNew) return next();
  console.log('hi');

  this.sifreDegistirmeTarih = Date.now();
  next();
});

userSchema.methods.sifreKarsilastir = async function (normalSifre) {
  return await bcrypt.compare(normalSifre, this.sifre);
};

userSchema.methods.sifreDegismisMi = function (tokenTarih) {};

const User = mongoose.model('User', userSchema);

module.exports = User;
