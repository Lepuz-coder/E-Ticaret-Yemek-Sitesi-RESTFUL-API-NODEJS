/* eslint-disable */

const urunEkleForm = document.getElementById('urunEkleButon');

if (urunEkleForm) {
  let val, id;
  const fields = {
    tip: [],
  };

  $('#tipEkleButon').click((e) => {
    val = $('#tip').val();
    id = fields.tip.length + 1;
    fields.tip.push({
      id,
      value: val,
    });
    $('#tip').val('');
    $('#tipKutu')
      .append(`<div class="alert alert-primary alert-dismissible fade show mt-2" role="alert">
    <strong>${val}</strong> 
    <button type="button" class="close" data-dismiss="alert" aria-label="Close" data-id="${id}">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`);
    console.log(fields);
  });

  $('#tipKutu').on('click', (e) => {
    const id = $(e.target).closest('.close').attr('data-id');
    const index = fields.tip.findIndex((e) => e.id == id);
    fields.tip.splice(index, 1);
    console.log(fields);
  });

  urunEkleForm.addEventListener('click', (e) => {
    e.preventDefault();
    const ad = $('#ad').val();
    const aciklama = $('#aciklama').val();
    const fiyat = $('#fiyat').val();
    const stok = $('#stok').val();

    const tipler = fields.tip.map((el) => el.value);
    console.log(tipler);
  });
}
