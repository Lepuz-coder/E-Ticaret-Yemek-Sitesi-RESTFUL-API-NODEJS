/*eslint-disable */
import '@babel/polyfill';
import axios from 'axios';

export const kayit = async (kullanici_ad, email, sifre, sifreTekrar) => {
  try {
    $('#kayitButon').hide();
    $('#FakekayitButon').removeClass('d-none');

    const res = await axios({
      method: 'POST',
      url: '/api/v1/auth/kayit',
      data: {
        kullanici_ad,
        email,
        sifre,
        sifreTekrar,
      },
    });

    $('#kayitFormKutu').slideUp(500);
    $('#kayitBasariKutu').html(
      '<div class="alert alert-success">Kayıt Başarıyla tamamlandı. Lütfen emailinizi onaylayınız</div>'
    );
    window.setTimeout(() => {
      location.assign('/urunler');
    }, 5000);
  } catch (err) {
    $('#FakekayitButon').addClass('d-none');
    $('#kayitButon').show();

    const error = err.response.data.message;

    for (let el in error) {
      $(`.${el}`).html(`*${error[el].message}`);
    }
  }
};
