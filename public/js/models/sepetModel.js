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

    Swal.close();
    Swal.fire({
      title: 'Güncellendi!',
      icon: 'success',
      confirmButtonText: 'Tamam',
    });
  } catch (err) {
    console.log(err.response);
  }
};
