const nodemailer = require('nodemailer');

class Email {
  constructor(kullanici, link) {
    this.to = kullanici.email;
    this.from = process.env.EMAIL_FROM;
    this.link = link;
    this.isim = kullanici.kullanici_ad;
  }

  transporter() {
    return nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      secure: false,
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });
  }

  async mailGonder(baslik, mesaj) {
    await this.transporter().sendMail({
      from: this.from,
      to: this.to,
      subject: baslik,
      text: mesaj,
    });
  }

  async emailVerifyTokenGonder() {
    await this.transporter().sendMail({
      from: this.from,
      to: this.to,
      subject: `Hoşgeldiniz ${this.isim}`,
      text: `Emailinizi onaylamak için bu linke gidiniz:\n ${this.link}`,
    });
  }

  async emailSifreUnuttumTokenGonder() {
    await this.transporter().sendMail({
      from: this.from,
      to: this.to,
      subject: `Şifre Sıfırlama`,
      text: `Şifrenizi mi unuttunuz ? Şifre sıfırlamak için bu linke gidiniz:\n ${this.link}. Eğer ki şifrenizi unutmadıysanız bu mesajı
        görmezden geliniz.`,
    });
  }
}

module.exports = Email;
