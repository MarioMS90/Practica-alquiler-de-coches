class BookingController {
  constructor(
    bookingService,
    carService,
    clientService,
    validationService,
    bookingView,
    clientView,
    carView,
  ) {
    this.bookingService = bookingService;
    this.carService = carService;
    this.clientService = clientService;
    this.validationService = validationService;
    this.bookingView = bookingView;
    this.clientView = clientView;
    this.carView = carView;

    this.clientView.table.bindInsert(this.handleInsert);
    this.clientView.table.bindUpdate(this.handleUpdate);
    this.clientView.table.bindDelete(this.handleDelete);
    this.carView.table.bindInsert(this.handleInsert);
    this.carView.table.bindUpdate(this.handleUpdate);
    this.carView.table.bindDelete(this.handleDelete);
    /*this.bookingView.table.bindInsert(this.handleInsert);
    this.bookingView.tableView.bindUpdate(this.handleUpdate);*/
    this.bookingView.table.bindDelete(this.handleDelete);

    this.SERVICES = {
      Client: this.clientService,
      Car: this.carService,
      Booking: this.bookingService,
    };

    this.VIEWS = {
      Client: this.clientView,
      Car: this.carView,
      Booking: this.bookingView,
    };

    this.displayData();
  }

  displayData() {
    this.clientService
      .findAll()
      .then(clients => (this.bookingService.clients = clients))
      .then(_ => this.carService.findAll().then(cars => cars))
      .then(({cars, garages}) => {
        this.bookingService.cars = cars;
        this.bookingService.garages = garages;
      })
      .then(_ => this.bookingService.findAll().then(data => data))
      .then(data => {
        this.clientView.displayClients(data.clients);
        this.carView.displayCars({cars: data.cars, garages: data.garages});
        this.bookingView.displayBookings({bookings: data.bookings, clients: data.clients});
      });
  }

  handleInsert = params => {
    const validations = this.validate(params);

    validations.every(validation => validation)
      ? this.SERVICES[params.class].insert(params) && this.displayData()
      : this.VIEWS[params.class].table.displayErrors(validations);
  };

  handleUpdate = params => {
    const validations = this.validate(params);

    validations.every(validation => validation)
      ? this.SERVICES[params.class].update(params) && this.displayData()
      : this.VIEWS[params.class].table.displayErrors(validations, params.id);
  };

  handleDelete = params => {
    this.SERVICES[params.class].delete(params.id);

    this.displayData();
  };

  validate = params =>
    Object.entries(this.validationService.VALIDATIONS[params.class]).map(([param, validation]) =>
      validation(params[param]),
    );
}
