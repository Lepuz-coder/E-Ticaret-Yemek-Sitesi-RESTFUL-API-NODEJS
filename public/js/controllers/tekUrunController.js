/*eslint-disable */
import { urunEkle } from '../models/tekUrunModel';

const tekUrunEkleButon = document.getElementById('urunSepeteEkle');

if (tekUrunEkleButon) {
  const sayi = $('.input-number');
  const stokSayi = parseInt($('.stokSayi').html());
  const urunId = $('.urunId').attr('data-id');

  $('.quantity-right-plus').on('click', () => {
    if (parseInt(sayi.val()) < stokSayi) sayi.val(parseInt(sayi.val()) + 1);
    else sayi.val(stokSayi);
  });

  $('.quantity-left-minus').on('click', () => {
    if (sayi.val() > 1) sayi.val(parseInt(sayi.val()) - 1);
    else sayi.val(1);
  });

  $('#urunSepeteEkle').on('click', () => {
    urunEkle(urunId, parseInt(sayi.val()));
  });
}
