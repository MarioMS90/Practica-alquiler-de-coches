class BookingController {
  constructor(bookingService, carService, clientService, validationService, clientView, carView) {
    this.bookingController = bookingService;
    this.carService = carService;
    this.clientService = clientService;
    this.validationService = validationService;
    this.clientView = clientView;
    this.carView = carView;

    this.clientView.bindInsertClient(this.handleInsert);
    this.clientView.bindUpdateClient(this.handleUpdate);
    this.clientView.bindDeleteClient(this.handleDelete);
    this.carView.bindInsertCar(this.handleInsert);
    this.carView.bindUpdateCar(this.handleUpdate);
    this.carView.bindDeleteCar(this.handleDelete);

    this.SERVICES = {
      Client: this.clientService,
      Car: this.carService,
    };

    this.VIEWS = {
      Client: this.clientView,
      Car: this.carView,
    };

    this.displayTables();
  }

  displayTables() {
    this.clientService.findAll().then(clients => this.clientView.displayClients(clients));
    this.carService.findAll().then(cars => this.carView.displayCars(cars));
  }

  handleInsert = params => {
    const validations = this.validate(params);

    validations.every(validation => validation)
      ? this.SERVICES[params.class].insert(params) && this.displayTables()
      : this.VIEWS[params.class].displayErrors(validations);
  };

  handleUpdate = params => {
    const validations = this.validate(params);
    validations.every(validation => validation)
      ? this.SERVICES[params.class].update(params) && this.displayTables()
      : this.VIEWS[params.class].displayErrors(validations, params.id);
  };

  handleDelete = params => {
    this.SERVICES[params.class].delete(params.id);

    this.displayTables();
  };

  validate = params =>
    Object.entries(this.validationService.VALIDATIONS[params.class]).map(([param, validation]) =>
      validation(params[param]),
    );
}
