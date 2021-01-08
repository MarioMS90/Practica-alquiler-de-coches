class CarView {
  constructor() {
    this.tableView = new TableView({
      tableId: 'carsTable',
      className: 'Car',
      header: [
        'ID',
        'Matrícula',
        'Marca',
        'Modelo',
        'Color',
        'Gasolina l',
        'Precio/hora €',
        'Garaje',
      ],
      dataTypes: {
        id: TableView.datatypes.TEXT_DISABLED,
        registration: TableView.datatypes.TEXT,
        brand: TableView.datatypes.TEXT,
        model: TableView.datatypes.TEXT,
        colour: TableView.datatypes.TEXT,
        gasolineLiters: TableView.datatypes.TEXT,
        priceHour: TableView.datatypes.TEXT,
        garage: TableView.datatypes.SELECT,
      },
    });
  }

  displayCars({cars, garages}) {
    const data = {
      elements: cars,
      selectElements: {
        garage: garages,
      },
    };

    this.tableView.displayData(data);
  }
}
