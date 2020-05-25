/* eslint-disable */
import validator from 'validator';
import { satinAl, sepettenCikar } from '../models/sepetModel';
import Swal from 'sweetalert2';

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

    const sehir = $('#sehir').val().trim();
    const ilce = $('#ilce').val().trim();
    const zip = $('#zip').val().trim();
    const adres = $('#adres').val().trim();

    if (sehir == '' || ilce == '' || zip == '' || adres == '') {
      return Swal.fire({
        icon: 'warning',
        title: 'Boş bırakmayınız!',
        text: 'Ödeme yapmak için tüm bilgileri doldurmalısınız',
      });
    }

    //Sadece ürün miktarları gönderilerek sepet güncellenicek sonra ise ödeme ekranına yönlendirilecek.
    const urunler = Array.from($('.input-number')).map((el) => {
      return {
        id: el.dataset.id,
        sayi: el.value,
      };
    });

    satinAl(urunler, { sehir, ilce, zip, adres })
      .then(() => {
        $('#odemeButon').hide();
        $('#iptalButon').removeClass('d-none');
        $('.input-number').attr('disabled', true);
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Bir şeyler ters gitti !',
          text: 'Daha sonra tekrar deneyiniz.',
        });
      });
  });

  $('#iptalButon').on('click', (e) => {
    e.preventDefault();
    Swal.fire({
      icon: 'warning',
      title: 'Emin misiniz?',
      text:
        'Daha sonra tekrardan ödeme yapmaya sepetinize gelebilirsiniz. Ürünleriniz silinmez.',
      confirmButtonText: 'Evet',
      cancelButtonText: 'Hayır',
      showCancelButton: true,
    }).then((res) => {
      if (!res.isDismissed) location.assign('/sepetim');
    });
  });

  $('.sepettenKaldir').on('click', (e) => {
    e.preventDefault();
    const id = e.target.dataset.id;
    sepettenCikar(id).then(() => {
      $(e.target).parents('.text-center').remove();
      const altToplam = parseFloat($('.altToplam').html().split('$')[1]);
      const fark = parseFloat(e.target.dataset.fiyat);
      $('.altToplam').html(`$${altToplam - fark}`);
      $('.genelToplam').html(`$${altToplam - fark + 2}`);
    });
  });
}
