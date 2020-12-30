class BookingService {
  API_ENDPOINT = 'SecretWord.php';
  constructor(httpService) {
    this.httpService = httpService;
    this.bookings = [];
  }

  findAll() {
    this.httpService
      .get(this.ENDPOINT_BOOKING)
      .then(bookings => bookings.map(booking => new Booking(booking)));
  }
}
