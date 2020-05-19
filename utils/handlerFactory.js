const hataYakala = require('./hataYakala');
const ApiEklenti = require('./apiEklenti');

exports.hepsiniAl = (Model) =>
  hataYakala(async (req, res, next) => {
    // eslint-disable-next-line prefer-destructuring
    if (!req.filter) req.filter = {};

    const apiEklenti = new ApiEklenti(Model.find(req.filter), req.query)
      .parcalaraAyir()
      .fieldArama()
      .sayfalama()
      .sutun()
      .siralama();

    const documents = await apiEklenti.query;

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

    if (populate) {
      populate.forEach((el) => {
        query.populate(el);
      });
    }

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

exports.guncelle = (Model) =>
  hataYakala(async (req, res, next) => {
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
