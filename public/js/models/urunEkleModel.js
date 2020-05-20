import '@babel/polyfill';
import axios from 'axios';

export const urunEkle = async (ad, fiyat, aciklama, stok, tipler) => {
  try {
    $('#urunEkleButon').hide();
    $('#FakeurunEkleButon').removeClass('d-none');

    await axios({
      method: 'POST',
      url: '/api/v1/yemekler',
      data: {
        ad,
        fiyat,
        aciklama,
        stok,
        tipler,
      },
    });
    $('#FakeurunEkleButon').val('Eklendi');

    alert('Eklendi');
  } catch (err) {
    $('#urunEkleButon').show();
    $('#FakeurunEkleButon').addClass('d-none');
    console.log(err.response.data);
  }
};
