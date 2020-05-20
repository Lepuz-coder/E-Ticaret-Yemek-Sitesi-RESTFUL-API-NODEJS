exports.urunlerGoster = (req, res, next) => {
  res.status(200).render('urunler', {
    kapakBaslik: 'ÜRÜNLER',
    title: 'Ürünler',
  });
};

exports.girisGoster = (req, res, next) => {
  res.status(200).render('giris', {
    kapakBaslik: 'GİŞİR YAP',
    title: 'Giriş',
  });
};
