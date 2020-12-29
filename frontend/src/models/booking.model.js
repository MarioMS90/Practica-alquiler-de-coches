class Booking {
  constructor({id, idClient, startDate, endDate, totalPrice, bookingDetails}) {
    this.id = id;
    this.idClient = idClient;
    this.startDate = startDate;
    this.endDate = endDate;
    this.totalPrice = totalPrice;
    this.bookingDetails = bookingDetails;
  }

  set startDate(startDate) {
    if (!REGEXP_BOOKING.DATE.test(startDate.format(FORMAT_DATE))) {
      throw Error('ERROR: La fecha de inicio no es válida.');
    }
    if (moment().diff(startDate) < 0) {
      throw Error('ERROR: La fecha de inicio es del futuro.');
    }

    this._startDate = startDate.format(FORMAT_DATE);
  }

  get startDate() {
    return this._startDate;
  }

  set endDate(endDate) {
    if (!REGEXP_BOOKING.DATE.test(endDate.format(FORMAT_DATE))) {
      throw Error('ERROR: La fecha de fin no es válida.');
    }
    if (endDate.diff(moment(this.startDate, FORMAT_DATE)) < 0) {
      throw Error('ERROR: La fecha de fin es anterior a la fecha de inicio.');
    }

    this._endDate = endDate.format(FORMAT_DATE);
  }

  get endDate() {
    return this._endDate;
  }

  set totalPrice(totalPrice) {
    if (!REGEXP_BOOKING.TOTAL_PRICE.test(totalPrice)) {
      throw Error('ERROR: El precio total no es válido.');
    }

    this._totalPrice = totalPrice;
  }

  get totalPrice() {
    return this._totalPrice;
  }
}
