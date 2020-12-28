class RentalService {
  ENDPOINT_BOOKING = 'http://localhost/ldldld';
  constructor(httpService) {
    this.httpService = httpService;
    this.bookings = [];
  }

  findAll() {
    this.httpService
      .get(this.ENDPOINT_BOOKING)
      .then(bookings => this.bookings.map(booking => new Booking(booking)));
  }
}
