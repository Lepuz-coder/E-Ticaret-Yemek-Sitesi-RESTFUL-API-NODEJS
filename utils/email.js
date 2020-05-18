const nodemailer = require('nodemailer');

class Email {
  constructor(kullanici, link) {
    this.to = kullanici.email;
    this.from = process.env.EMAIL_FROM;
    this.link = link;
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

  async mailGonder(mesaj, baslik) {
    await this.transporter().sendMail({
      from: this.from,
      to: this.to,
      subject: baslik,
      text: mesaj,
    });
  }
}

module.exports = Email;
