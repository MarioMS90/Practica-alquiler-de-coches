class Booking {
  constructor({id, client, startDatetime, totalPrice, bookingDetails}) {
    this.id = id;
    this.client = client;
    this.startDatetime = startDatetime;
    this.totalPrice = totalPrice;
    this.bookingDetails = bookingDetails;
  }

  set startDatetime(startDatetime) {
    if (!REGEXP_BOOKING.DATE.test(startDatetime.format(FORMAT_DATE))) {
      throw Error('ERROR: La fecha de inicio no es válida.');
    }
    if (moment().diff(startDatetime) < 0) {
      throw Error('ERROR: La fecha de inicio es del futuro.');
    }

    this._startDatetime = startDatetime.format(FORMAT_DATE);
  }

  get startDatetime() {
    return this._startDatetime;
  }

  set endDatetime(endDatetime) {
    if (!REGEXP_BOOKING.DATE.test(endDatetime.format(FORMAT_DATE))) {
      throw Error('ERROR: La fecha de fin no es válida.');
    }
    if (endDatetime.diff(moment(this.startDatetime, FORMAT_DATE)) < 0) {
      throw Error('ERROR: La fecha de fin es anterior a la fecha de inicio.');
    }

    this._endDatetime = endDatetime.format(FORMAT_DATE);
  }

  get endDatetime() {
    return this._endDatetime;
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
