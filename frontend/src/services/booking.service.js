class BookingService {
  BOOKINGS_ENDPOINT = `${API_URL}:${PORT}/bookings`;
  BOOKING_DETAILS_ENDPOINT = `${API_URL}:${PORT}/bookingDetails`;

  constructor(httpService) {
    this.httpService = httpService;

    this.cars = [];
    this.garages = [];
    this.bookings = [];
    this.bookingDetails = [];

    this.handleError = (name, error) => console.error(`ERROR ${name} en BookingService.`, error);
  }

  findById = id => this.bookings.find(booking => booking.id === id);

  findAll = () => {
    return this.findBookingDetails()
      .then(bookingDetails =>
        this.httpService.get(this.BOOKINGS_ENDPOINT).then(
          bookings =>
            (this.bookings = bookings.map(booking => {
              booking.bookingDetails = bookingDetails.filter(
                bookingDetail => bookingDetail.booking === booking.id,
              );
              booking.client = this.clients.find(client => client.id === booking.client);
              return new Booking(booking);
            })),
        ),
      )
      .then(_ => ({
        bookings: this.bookings,
        bookingDetails: this.bookingDetails,
        cars: this.cars,
        garages: this.garages,
        clients: this.clients,
      }))
      .catch(error => this.handleError('findAll', error));
  };

  findBookingDetails = () =>
    this.httpService
      .get(this.BOOKING_DETAILS_ENDPOINT)
      .then(
        bookingDetails =>
          (this.bookingDetails = bookingDetails.map(bookingDetail => {
            bookingDetail.car = this.cars.find(car => car.id === bookingDetail.car);
            return new BookingDetail(bookingDetail);
          })),
      )
      .catch(error => this.handleError('findBookingDetails', error));

  insert = booking => {
    //FORMATEAR FECHA Y CALCULAR NUMERO DE HORAS - SIN TERMINAR
    const startDatetime = moment(`${booking.startDate} ${booking.startTime}`, FORMAT_DATE);
    const endDatetime = moment(`${booking.endDate} ${booking.endTime}`, FORMAT_DATE);

    const hours = Math.ceil(moment.duration(endDatetime.diff(startDatetime)).asHours());

    booking.startDatetime = startDatetime.format(FORMAT_DATE);
    booking.endDatetime = endDatetime.format(FORMAT_DATE);

    return this.httpService
      .post(`${this.BOOKINGS_ENDPOINT}`, booking)
      .then(booking => booking)
      .catch(error => this.handleError('insert', error));
  };

  update = booking => {
    return this.httpService
      .put(`${this.BOOKINGS_ENDPOINT}/${car.id}`, booking)
      .then(booking => booking)
      .catch(error => this.handleError('update', error));
  };

  delete = id => {
    return this.httpService
      .delete(`${this.BOOKINGS_ENDPOINT}/${id}`)
      .then(booking => booking)
      .catch(error => this.handleError('delete', error));
  };
}
