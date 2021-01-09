class Booking {
  constructor({id, client, startDatetime, endDatetime, totalPrice, bookingDetails}) {
    this.id = id;
    this.client = client;
    this.startDatetime = startDatetime;
    this.endDatetime = endDatetime;
    this.totalPrice = totalPrice;
    this.bookingDetails = bookingDetails;
  }

  set startDatetime(startDatetime) {
    this.startDate = moment(startDatetime, FORMAT_DATE).format('YYYY-MM-DD');
    this.startTime = moment(startDatetime, FORMAT_DATE).format('HH:mm:SS');
  }

  set endDatetime(endDatetime) {
    this.endDate = moment(endDatetime, FORMAT_DATE).format('YYYY-MM-DD');
    this.endTime = moment(endDatetime, FORMAT_DATE).format('HH:mm:SS');
  }
}
