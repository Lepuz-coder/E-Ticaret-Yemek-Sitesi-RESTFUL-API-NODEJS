/* eslint-disable radix */
module.exports = class ApiEklenti {
  constructor(query, link) {
    this.query = query;
    this.link = link;
  }

  parcalaraAyir() {
    const linkQuery = { ...this.link };

    const fieldAdlariDisindakiler = ['sayfa', 'limit']; //Buraya eklenti yapıcaksın

    Object.keys(linkQuery).forEach((el) => {
      if (fieldAdlariDisindakiler.includes(el)) delete linkQuery[el];
    });

    this.fieldAramaFilter = linkQuery;
    return this;
  }

  //Başında / işareti var ise regular expression kullanır
  fieldArama() {
    Object.keys(this.fieldAramaFilter).forEach((el) => {
      if (this.fieldAramaFilter[el].startsWith('/')) {
        this.fieldAramaFilter[el] = this.fieldAramaFilter[el].split('/')[1];
        this.fieldAramaFilter[el] = new RegExp(this.fieldAramaFilter[el], 'i');
      }
    });

    this.query = this.query.find(this.fieldAramaFilter);
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
};
