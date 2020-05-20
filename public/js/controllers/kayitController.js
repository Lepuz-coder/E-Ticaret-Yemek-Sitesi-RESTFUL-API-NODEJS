/* eslint-disable */
import { kayit } from '../models/kayitModel';

const kayitButton = document.getElementById('kayitButon');

//Kayıt Controller
if (kayitButton) {
  kayitButton.addEventListener('submit', (e) => {
    e.preventDefault();
    const kulad = $('#ad').val();
    const email = $('#email').val();
    const sifre = $('#sifre').val();
    const sifreTekrar = $('#sifreTekrar').val();

    if (kulad == '' || email == '' || sifre == '' || sifreTekrar == '') {
      $('#uyari_mesaj').html('Lütfen bilgileri boş bırakmayınız');
      setTimeout(() => {
        $('#uyari_mesaj').html('');
      }, 2500);
    } else {
      kayit(kulad, email, sifre, sifreTekrar);
    }
  });
}
