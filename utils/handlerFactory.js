const hataYakala = require('./hataYakala');
const ApiEklenti = require('./apiEklenti');

exports.hepsiniAl = (Model) =>
  hataYakala(async (req, res, next) => {
    /*Linkte kullanıcıları belirli özelliklerine göre aramalar eklenicek
     * field ile name=Lepuz gibi
     */
    const apiEklenti = new ApiEklenti(Model.find(), req.query)
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
