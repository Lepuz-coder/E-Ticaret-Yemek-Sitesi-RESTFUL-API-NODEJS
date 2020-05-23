/* eslint-disable */

import { begenToggle } from '../models/urunlerModel';

const kalp = document.querySelector('.heart');

if (kalp) {
  $('.heart').on('click', (e) => {
    e.preventDefault();

    const id = $(e.target).closest('.yemekId').attr('data-id');
    begenToggle(id);
  });
}
