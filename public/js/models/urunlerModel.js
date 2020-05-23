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
        title: 'Beğeni eklendi',
      });
      return true;
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Beğeni kaldırıldı',
      });
      return false;
    }
  } catch (err) {
    console.log(err.response.data);
  }
};
