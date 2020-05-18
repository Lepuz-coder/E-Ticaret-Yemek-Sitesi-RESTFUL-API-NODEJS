/* eslint-disable radix */
module.exports = class ApiEklenti {
  constructor(query, link) {
    this.query = query;
    this.link = link;
  }

  parcalaraAyir() {
    const linkQuery = { ...this.link };

    const fieldAdlariDisindakiler = ['sayfa', 'limit', 'sutunlar', 'sira']; //Buraya eklenti yapıcaksın

    Object.keys(linkQuery).forEach((el) => {
      if (fieldAdlariDisindakiler.includes(el)) delete linkQuery[el];
    });

    this.fieldAramaFilter = linkQuery;
    return this;
  }

  //Başında / işareti var ise regular expression kullanır
  fieldArama() {
    let stringFilter = JSON.stringify(this.fieldAramaFilter);
    stringFilter = stringFilter.replace(
      /\b(lte|lt|gte|gt)\b/g,
      (match) => `$${match}`
    );

    const filter = { ...JSON.parse(stringFilter) };

    Object.keys(filter).forEach((el) => {
      if (typeof filter[el] === 'string' && filter[el].startsWith('/')) {
        filter[el] = filter[el].split('/')[1];
        filter[el] = new RegExp(filter[el], 'i');
      }
    });

    this.query = this.query.find(filter);
    return this;
  }

  sayfalama() {
    //sayfa, sayi
    if (this.link.sayfa) {
      const sayfa = parseInt(this.link.sayfa);
      const limit = this.link.limit * 1 || 10;

      const skip = (sayfa - 1) * limit;
      this.query = this.query.skip(skip).limit(limit);
    }
    return this;
  }

  sutun() {
    if (this.link.sutunlar) {
      const sutunlar = this.link.sutunlar.replace(/,/g, ' ');
      this.query = this.query.select(sutunlar);
    }
    return this;
  }

  siralama() {
    if (this.link.sira) {
      const siralama = this.link.sira.replace(/,/, ' ');
      this.query = this.query.sort(siralama);
    }
    return this;
  }
};
