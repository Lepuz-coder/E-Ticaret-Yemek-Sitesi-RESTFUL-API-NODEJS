/* eslint-disable */
import '@babel/polyfill';
import axios from 'axios';
import Swal from 'sweetalert2';

export const urunEkle = async (id, sayi) => {
  try {
    Swal.fire({
      title: 'Yükleniyor...',
      imageUrl: '/gif/loading.gif',
      imageWidth: 100,
      showConfirmButton: false,
    });

    await axios({
      method: 'POST',
      url: `/api/v1/sepet/${id}/${sayi}`,
    });

    Swal.close();

    Swal.fire({
      title: 'Sepete Eklendi',
      icon: 'success',
      confirmButtonText: 'Sepete Git',
    }).then((res) => {
      if (!res.isDismissed) location.assign('/sepetim');
    });
  } catch (err) {
    console.log(err.response);
  }
};
