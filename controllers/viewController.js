exports.urunlerGoster = (req, res, next) => {
  res.status(200).render('urunler', {
    kapakBaslik: 'ÜRÜNLER',
  });
};
