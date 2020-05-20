/* eslint-disable eqeqeq */
const Begen = require('../models/begenModel');
const hataYakala = require('../utils/hataYakala');

exports.begenilenEkle = hataYakala(async (req, res, next) => {
  const begen = await Begen.findOne({ kullanici: req.user.id });

  begen.begenilenler.push({
    begenilen: req.params.id,
  });

  await begen.save();

  res.status(200).json({
    status: 'success',
    begen,
  });
});

exports.begenilenCikar = hataYakala(async (req, res, next) => {
  const begen = await Begen.findOne({ kullanici: req.user.id });

  const index = begen.begenilenler.findIndex(
    (el) => el.begenilen == req.param.id
  );

  begen.begenilenler.splice(index, 1);

  await begen.save();

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.begenilenleriGetir = hataYakala(async (req, res, next) => {
  const begenilenler = await Begen.findOne({ kullanici: req.user.id });

  res.status(200).json({
    status: 'success',
    begenilenler,
  });
});

exports.tumBegenilenleriKaldir = hataYakala(async (req, res, next) => {
  const begen = await Begen.findOne({ kullanici: req.user.id });

  begen.begenilenler.splice(0, begen.begenilenler.length);

  await begen.save();

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
