class BookingView {
  constructor() {
    this.table = new TableComponent({
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
        id: TableComponent.datatypes.TEXT_DISABLED,
        client: TableComponent.datatypes.SELECT,
        startDate: TableComponent.datatypes.DATE,
        startTime: TableComponent.datatypes.TIME,
        endDate: TableComponent.datatypes.DATE,
        endTime: TableComponent.datatypes.TIME,
        totalPrice: TableComponent.datatypes.TEXT_DISABLED,
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

    this.table.displayData(data);
  }
}
