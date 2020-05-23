/* eslint-disable */

import { begenToggle } from '../models/urunlerModel';
import Swal from 'sweetalert2';

const kalp = document.querySelector('.heart');

if (kalp) {
  $('.heart').on('click', (e) => {
    e.preventDefault();

    const id = $(e.target).closest('.yemekId').attr('data-id');
    const giris = $(e.target).closest('.yemekId').attr('data-giris');
    if (giris) {
      begenToggle(id)
        .then((res) => {
          console.log($(e.target).closest('.yemekId'));
          if (res) {
            $(e.target)
              .closest('.yemekId')
              .find('.likeButon')
              .toggleClass('d-none');
            $(e.target)
              .closest('.yemekId')
              .find('.dislikeButon')
              .toggleClass('d-none');
          } else {
            $(e.target)
              .closest('.yemekId')
              .find('.likeButon')
              .toggleClass('d-none');
            $(e.target)
              .closest('.yemekId')
              .find('.dislikeButon')
              .toggleClass('d-none');
          }
        })
        .catch((err) => {
          console.log(`ERROR: ${err}`);
        });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Beğenmek için giriş yapınız',
      });
    }
  });
}
