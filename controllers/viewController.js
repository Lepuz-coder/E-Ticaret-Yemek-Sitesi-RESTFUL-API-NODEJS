exports.urunlerGoster = (req, res, next) => {
  res.status(200).render('urunler', {
    kapakBaslik: 'ÜRÜNLER',
    title: 'Ürünler',
  });
};

exports.kayitGoster = (req, res, next) => {
  res.status(200).render('kayit', {
    kapakBaslik: 'Kayıt Ol',
    title: 'Kayıt',
  });
};

exports.girisGoster = (req, res, next) => {
  res.status(200).render('giris', {
    kapakBaslik: 'Giriş Yap',
    title: 'Giris',
  });
};
