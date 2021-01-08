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
    this.startDate = moment(startDatetime).format('YYYY-MM-DD');
    this.startTime = moment(startDatetime).format('HH:MM');
  }

  set endDatetime(endDatetime) {
    this.endDate = moment(endDatetime).format('YYYY-MM-DD');
    this.endTime = moment(endDatetime).format('HH:MM');
  }
}
