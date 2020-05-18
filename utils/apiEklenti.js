/* eslint-disable radix */
module.exports = class ApiEklenti {
  constructor(query, link) {
    this.query = query;
    this.link = link;
  }

  //Buraya zaman geçtikçe eklentiler yapılacak
  parcalaraAyir() {
    const fieldAramaFilter = {};

    Object.keys(this.link).forEach((el) => {
      if (el !== 'sayfa' && el !== 'limit')
        fieldAramaFilter[el] = this.link[el];
    });

    this.fieldAramaFilter = fieldAramaFilter;
    return this;
  }

  fieldArama() {
    this.query = this.query.find(this.fieldAramaFilter);
    return this;
  }

  sayfalama() {
    //sayfa, sayi
    if (this.link.sayfa) {
      console.log(this.link);
      const sayfa = parseInt(this.link.sayfa);
      const limit = this.link.limit * 1 || 10;

      const skip = (sayfa - 1) * limit;
      this.query = this.query.skip(skip).limit(limit);
    }
    return this;
  }
};
