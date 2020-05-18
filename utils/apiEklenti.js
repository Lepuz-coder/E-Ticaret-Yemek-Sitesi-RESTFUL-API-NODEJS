module.exports = class ApiEklenti {
  constructor(query, link) {
    this.query = query;
    this.link = link;
  }

  //Buraya zaman geçtikçe eklentiler yapılacak
  parcalaraAyir() {
    const fieldAramaFilter = {};

    Object.keys(this.link).forEach((el) => {
      if (el !== 'sayfa') fieldAramaFilter[el] = this.link[el];
    });

    this.fieldAramaFilter = fieldAramaFilter;
    return this;
  }

  fieldArama() {
    this.query = this.query.find(this.fieldAramaFilter);
    return this;
  }
};
