/* eslint-disable */

import { begenToggle, sepetToggle } from '../models/urunlerModel';
import Swal from 'sweetalert2';

const kalp = document.querySelector('.heart');

if (kalp) {
  $('.heart').on('click', (e) => {
    e.preventDefault();

    const id = $(e.target).closest('.yemekId').attr('data-id');
    if (id) {
      begenToggle(id)
        .then((res) => {
          console.log($(e.target).closest('.yemekId'));
          const likeTarget = $(e.target).closest('.yemekId').find('.likeButon');
          const dislikeTarget = $(e.target)
            .closest('.yemekId')
            .find('.dislikeButon');
          if (res) {
            likeTarget.toggleClass('d-none');
            dislikeTarget.toggleClass('d-none');
          } else {
            likeTarget.toggleClass('d-none');
            dislikeTarget.toggleClass('d-none');
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: 'warning',
            title:
              'Bir hata meydana geldi ! Lütfen daha sonra tekrar deneyiniz.',
          });
        });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Beğenmek için giriş yapınız',
        confirmButtonText: 'Giriş Yap',
        type: 'success ',
      }).then(function (res) {
        if (!res.isDismissed) location.assign('/giris');
      });
    }
  });

  $('.buy-now').on('click', (e) => {
    e.preventDefault();

    const id = $(e.target).closest('.yemekId').attr('data-id');
    if (id) {
      //Sepete ekleme modeli çağrılacak
      sepetToggle(id)
        .then((res) => {
          const sayi = parseInt(
            $('.sepetSayiGosterge')
              .html()
              .match(/\[(.*)\]/)
              .pop()
          );
          if (res) {
            console.log(sayi);
            $('.sepetSayiGosterge').html(`[${sayi + 1}]`);
          } else {
            $('.sepetSayiGosterge').html(`[${sayi - 1}]`);
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: 'warning',
            title:
              'Bir hata meydana geldi ! Lütfen daha sonra tekrar deneyiniz.',
          });
        });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Beğenmek için giriş yapınız',
        confirmButtonText: 'Giriş Yap',
        type: 'success ',
      }).then(function (res) {
        if (!res.isDismissed) location.assign('/giris');
      });
    }
  });
}
