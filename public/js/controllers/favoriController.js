/* eslint-disable */
import { begeniKaldir } from '../models/favoriModel';

const favoriKaldir = document.querySelector('.favoriKaldir');

if (favoriKaldir) {
  console.log('Var');
  $('.favoriKaldir').on('click', (e) => {
    const id = $(e.target).closest('.favoriKaldir').attr('data-id');
    begeniKaldir(id).then(() => {
      $(e.target).closest('.anaSatir').hide();
    });
  });
}
