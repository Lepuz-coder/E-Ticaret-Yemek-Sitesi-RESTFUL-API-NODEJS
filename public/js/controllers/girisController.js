/* eslint-disable */
import { giris } from '../models/girisModel';

const girisButon = document.getElementById('girisButon');

//Kayıt Controller
if (girisButon) {
  girisButon.addEventListener('click', (e) => {
    e.preventDefault();
    const ad_email = $('#ad_email').val();
    const sifre = $('#sifre').val();

    if (ad_email == '' || sifre == '') {
      $('#uyari_mesaj').html('Lütfen bilgileri boş bırakmayınız');
      setTimeout(() => {
        $('#uyari_mesaj').html('');
      }, 2500);
    } else {
      giris(ad_email, sifre);
    }
  });
}
