/* eslint-disable */
import '@babel/polyfill';
import axios from 'axios';
import Swal from 'sweetalert2';

export const satinAl = async (urunler) => {
  try {
    Swal.fire({
      title: 'Yükleniyor...',
      imageUrl: '/gif/loading.gif',
      imageWidth: 100,
      showConfirmButton: false,
    });

    await axios({
      method: 'PUT',
      url: '/api/v1/sepet/guncelle',
      data: {
        urunler,
      },
    });

    const form = await axios({
      method: 'GET',
      url: '/api/v1/sepet/checkout-session',
    });

    Swal.close();
    console.log(form.data);
    $('.anaContainter').append(form.data.form);
  } catch (err) {
    console.log(err.response);
  }
};
