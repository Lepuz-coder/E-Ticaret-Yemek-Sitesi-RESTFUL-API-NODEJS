const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const cryptoRandomString = require('crypto-random-string');
const crypto = require('crypto');
const Yemek = require('./yemekModel');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
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
    sifreDegistirmeTarih: {
      type: Date,
      select: false,
    },
    emailVerify: {
      type: Boolean,
      default: false,
    },
    emailVerifyCode: {
      type: String,
      select: false,
    },
    passwordResetCode: {
      type: String,
      select: false,
    },

    /**
     * Sepet, Favoriler, eklenicek
     */
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual('yemekler', {
  ref: Yemek,
  foreignField: 'satan_kullanici',
  localField: '_id',
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('sifre')) return next();

  this.sifreTekrar = undefined;
  const hashedSifre = await bcrypt.hash(this.sifre, 12);
  this.sifre = hashedSifre;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('sifre') || this.isNew) return next();
  console.log('Tarih Sifre');

  this.sifreDegistirmeTarih = Date.now();
  next();
});

userSchema.methods.sifreKarsilastir = async function (normalSifre) {
  return await bcrypt.compare(normalSifre, this.sifre);
};

userSchema.methods.sifreDegismisMi = function (tokenTarih) {
  if (!this.sifreDegistirmeTarih) return false;

  const sifreUnixTime = this.sifreDegistirmeTarih.getTime() / 1000;
  console.log({ tokenTarih, sifreUnixTime });
  return tokenTarih < sifreUnixTime;
};

userSchema.methods.emailTokenAndSend = function (type) {
  const randomToken = cryptoRandomString({ length: 15 });
  const hashedRandomToken = crypto
    .createHash('sha256')
    .update(randomToken)
    .digest('hex');

  if (type === 'verify') {
    this.emailVerifyCode = hashedRandomToken;
  } else if (type === 'password') {
    this.passwordResetCode = hashedRandomToken;
  }
  console.log({ randomToken, hashedRandomToken });

  return randomToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
