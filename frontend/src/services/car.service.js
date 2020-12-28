class CarService {
  ENDPOINT_BOOKING = 'http://localhost/ldldld';
  cars = [];

  constructor(httpService) {
    this.httpService = httpService;
  }

  findAll() {
    this.httpService
      .get(this.ENDPOINT_BOOKING)
      .then(bookings => this.bookings.map(booking => new Booking(booking)));
  }
}
