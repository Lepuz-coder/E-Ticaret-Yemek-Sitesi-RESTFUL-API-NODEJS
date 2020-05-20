import '@babel/polyfill';
import axios from 'axios';

export const urunEkle = async (data) => {
  try {
    $('#urunEkleButon').hide();
    $('#FakeurunEkleButon').removeClass('d-none');
    await axios({
      method: 'POST',
      url: '/api/v1/yemekler',
      data,
    });
    $('#FakeurunEkleButon').val('Eklendi');

    window.setTimeout(() => {
      location.assign('/urunler');
    }, 700);
  } catch (err) {
    $('#urunEkleButon').show();
    $('#FakeurunEkleButon').addClass('d-none');
    console.log(err.response.data);
  }
};
