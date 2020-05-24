/* eslint-disable */
import validator from 'validator';

const sepetButon = document.getElementById('odemeButon');

if (sepetButon) {
  $('.quantity').on('keyup', (e) => {
    //String girilmiş mi diye kontrol et
    if (!validator.isNumeric(e.target.value)) e.target.value = 1;
    //0 olarak seçeneğe izin vermiyoruz
    if (parseInt(e.target.value) === 0) e.target.value = 1;
    //Stok sayısını geçmemesini sağlıyoruz
    const stok = $(e.target).next().val();
    if (parseInt(e.target.value) > parseInt(stok)) e.target.value = stok;
    //Yeni sonucu toplama yazıp eski fiyatla aradaki farkı subToplama eklicez
    const fiyatDom = $(e.target).parent().parent().next();
    let eskiFiyat = fiyatDom.html();
    eskiFiyat = parseFloat(eskiFiyat.split('$')[1]);

    const yeniFiyat =
      parseFloat(e.target.dataset.fiyat) * parseInt(e.target.value);
    fiyatDom.html(`$${yeniFiyat}`);

    const fark = yeniFiyat - eskiFiyat;

    const altToplam = parseFloat($('.altToplam').html().split('$')[1]);
    $('.altToplam').html(`$${altToplam + fark}`);
    $('.genelToplam').html(`$${altToplam + fark + 2}`);
  });

  $('#odemeButon').on('click', (e) => {
    e.preventDefault();
  });
}
