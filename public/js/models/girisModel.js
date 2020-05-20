/*eslint-disable */
import '@babel/polyfill';
import axios from 'axios';

export const giris = async (isim_email, sifre) => {
  try {
    $('#girisButon').hide();
    $('#FakegirisButon').removeClass('d-none');

    await axios({
      method: 'POST',
      url: '/api/v1/auth/giris',
      data: {
        isim_email,
        sifre,
      },
    });

    window.setTimeout(() => {
      location.assign('/urunler');
    }, 200);
  } catch (err) {
    $('#FakegirisButon').addClass('d-none');
    $('#girisButon').show();

    const error = err.response.data.message;
    $('#uyari_mesaj').html(error);
    setTimeout(() => {
      $('#uyari_mesaj').html('');
    }, 2500);
  }
};
