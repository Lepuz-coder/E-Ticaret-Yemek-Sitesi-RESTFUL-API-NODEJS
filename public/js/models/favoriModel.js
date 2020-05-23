/* eslint-disable */
import '@babel/polyfill';
import axios from 'axios';
import Swal from 'sweetalert2';

export const begeniKaldir = async (id) => {
  try {
    Swal.fire({
      title: 'Yükleniyor...',
      imageUrl: '/gif/loading.gif',
      imageWidth: 100,
      showConfirmButton: false,
    });

    await axios({
      method: 'DELETE',
      url: `api/v1/begen/${id}`,
    });

    Swal.close();

    Swal.fire({
      title: 'Favorilerden kaldırıldı',
      timer: 500,
      icon: 'success',
      showConfirmButton: false,
    });
  } catch (err) {
    console.log(err.response);
  }
};
