/*eslint-disable */

const tekUrunEkleButon = document.getElementById('urunSepeteEkle');

if (tekUrunEkleButon) {
  const sayi = $('.input-number');
  const stokSayi = parseInt($('.stokSayi').html());

  $('.quantity-right-plus').on('click', () => {
    if (parseInt(sayi.val()) < stokSayi) sayi.val(parseInt(sayi.val()) + 1);
    else sayi.val(stokSayi);
  });

  $('.quantity-left-minus').on('click', () => {
    if (sayi.val() > 1) sayi.val(parseInt(sayi.val()) - 1);
    else sayi.val(1);
  });
}
