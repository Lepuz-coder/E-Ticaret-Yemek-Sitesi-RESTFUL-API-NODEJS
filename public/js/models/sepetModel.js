/* eslint-disable */
import '@babel/polyfill';
import axios from 'axios';
import Swal from 'sweetalert2';

export const satinAl = async (urunler, bilgiler) => {
  try {
    Swal.fire({
      title: 'Yükleniyor...',
      text: 'Bu biraz zaman alabilir.',
      imageUrl: '/gif/loading.gif',
      imageWidth: 100,
      icon: 'info',
      showConfirmButton: false,
    });

    await axios({
      method: 'PUT',
      url: '/api/v1/sepet/guncelle',
      data: {
        urunler,
      },
    });
    console.log(bilgiler);
    const form = await axios({
      method: 'POST',
      url: '/api/v1/sepet/checkout/session/update',
      data: {
        bilgiler,
      },
    });

    Swal.close();
    console.log(form.data);
    $('.anaContainter').append(form.data.form);
  } catch (err) {
    console.log(err.response);
  }
};

export const sepettenCikar = async (id) => {
  try {
    Swal.fire({
      title: 'Yükleniyor...',
      imageUrl: '/gif/loading.gif',
      imageWidth: 100,
      showConfirmButton: false,
    });

    await axios({
      method: 'DELETE',
      url: `/api/v1/sepet/${id}`,
    });

    Swal.close();

    Swal.fire({
      title: 'Kaldırıldı !',
      timer: 400,
    });
  } catch (err) {
    console.log(err.response.data);
  }
};
