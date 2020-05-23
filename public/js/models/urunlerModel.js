/* eslint-disable */
import '@babel/polyfill';
import axios from 'axios';
import Swal from 'sweetalert2';

export const begenToggle = async (id) => {
  try {
    Swal.fire({
      title: 'Yükleniyor...',
      timer: '500',
      imageUrl: '/gif/loading.gif',
      imageWidth: 100,
      showConfirmButton: false,
    });
    const res = await axios({
      method: 'POST',
      url: `/api/v1/begen/toggle/${id}`,
    });

    if (res.data) {
      Swal.fire({
        icon: 'success',
        title: 'Favorilere eklendi',
        timer: '1000',
        showConfirmButton: false,
      });
      return true;
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Favorilerden kaldırıldı',
        timer: '700',
        showConfirmButton: false,
      });
      return false;
    }
  } catch (err) {
    console.log(err.response.data);
  }
};

export const sepetToggle = async (id) => {
  Swal.fire({
    title: 'Yükleniyor...',
    timer: '500',
    imageUrl: '/gif/loading.gif',
    imageWidth: 100,
    showConfirmButton: false,
  });

  const res = await axios({
    method: 'POST',
    url: `/api/v1/sepet/toggle/${id}`,
  });

  if (res.data.tip === 'Ekleme') {
    Swal.fire({
      icon: 'success',
      title: 'Sepete eklendi',
      timer: '1000',
      showConfirmButton: false,
    });
    return true;
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Sepetten kaldırıldı',
      timer: '700',
      showConfirmButton: false,
    });
    return false;
  }
};
