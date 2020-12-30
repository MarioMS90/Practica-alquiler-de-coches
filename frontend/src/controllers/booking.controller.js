class BookingController {
  constructor(bookingService, carService, clientService, bookingView) {
    this.bookingController = bookingService;
    this.carService = carService;
    this.clientService = clientService;
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
    try {
      this.clientService.update(new Client(client));
    } catch (error) {
      this.bookingView.displayClientError(error);
    }

    this.displayTables();
  };
}
