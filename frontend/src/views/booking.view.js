class BookingView {
  constructor() {
    this.tableView = new TableView({
      tableId: 'bookingsTable',
      className: 'Booking',
      header: [
        'ID',
        'Client',
        'Fecha inicio',
        'Hora inicio',
        'Fecha fin',
        'Hora fin',
        'Precio total €',
      ],
      dataTypes: {
        id: TableView.datatypes.TEXT_DISABLED,
        client: TableView.datatypes.SELECT,
        startDate: TableView.datatypes.DATE,
        startTime: TableView.datatypes.TIME,
        endDate: TableView.datatypes.DATE,
        endTime: TableView.datatypes.TIME,
        totalPrice: TableView.datatypes.TEXT_DISABLED,
      },
    });
  }

  displayBookings({bookings, clients}) {
    const data = {
      elements: bookings,
      selectElements: {
        client: clients,
      },
    };

    this.tableView.displayData(data);
  }
}
