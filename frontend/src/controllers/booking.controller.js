class BookingController {
  constructor(bookingService, carService, clientService, validationService, bookingView) {
    this.bookingController = bookingService;
    this.carService = carService;
    this.clientService = clientService;
    this.validationService = validationService;
    this.bookingView = bookingView;

    this.bookingView.bindUpdateClient(this.handleUpdateClient);
    this.bookingView.bindDeleteClient(this.handleDeleteClient);

    this.displayTables();
  }

  displayTables() {
    this.clientService.findAll().then(clients => this.bookingView.displayClients(clients));
  }

  handleDeleteClient = id => {
    this.clientService.delete(id);

    this.displayTables();
  };

  handleUpdateClient = client => {
    const validations = [
      this.validationService.CLIENT_VALIDATION.dni(client.dni),
      this.validationService.CLIENT_VALIDATION.name(client.name),
      this.validationService.CLIENT_VALIDATION.adress(client.adress),
      this.validationService.CLIENT_VALIDATION.phone(client.phone),
    ];

    validations.every(validation => validation)
      ? this.clientService.update(client) && this.displayTables()
      : this.bookingView.displayClientErrors(client.id, validations);
  };
}
