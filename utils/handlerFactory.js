const hataYakala = require('./hataYakala');
const ApiEklenti = require('./apiEklenti');

const objeFiltre = (obj, filtre) => {
  Object.keys(obj).forEach((el) => {
    if (filtre.includes(el)) delete obj[el];
  });
  return obj;
};

exports.hepsiniAl = (Model, tip) =>
  hataYakala(async (req, res, next) => {
    // eslint-disable-next-line prefer-destructuring
    if (!req.filter) req.filter = {};

    const apiEklenti = new ApiEklenti(Model.find(req.filter), req.query)
      .parcalaraAyir()
      .fieldArama()
      .sayfalama()
      .sutun()
      .siralama();

    let documents;

    if (tip === 'sepet') {
      documents = await apiEklenti.query
        .findOne({ kullanici: req.user.id })
        .populate({
          path: 'urunler.yemek',
          select: 'ad fiyat aciklama stok',
        });
    } else {
      documents = await apiEklenti.query;
    }

    res.status(200).json({
      status: 'success',
      sayi: documents.length,
      data: {
        documents,
      },
    });
  });

exports.birTaneAl = (Model, ...populate) =>
  hataYakala(async (req, res, next) => {
    const query = Model.findById(req.params.id);
    console.log(populate);
    if (populate) {
      populate.forEach((el) => {
        query.populate(el);
      });
    }
    console.log(query);
    const doc = await query;

    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });

exports.olustur = (Model) =>
  hataYakala(async (req, res, next) => {
    const newDoc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        newDoc,
      },
    });
  });

exports.guncelle = (Model, ...filtre) =>
  hataYakala(async (req, res, next) => {
    if (req.user.rol !== 'admin') req.body = objeFiltre(req.body, filtre);

    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });

exports.sil = (Model) =>
  hataYakala(async (req, res, next) => {
    await Model.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
