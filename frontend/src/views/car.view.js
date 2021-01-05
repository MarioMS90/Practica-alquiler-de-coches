class CarView {
  constructor() {
    this.tableView = new TableView({
      tableName: 'carsTable',
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
        id: TableView.DATATYPES.TEXT,
        registration: TableView.DATATYPES.TEXT,
        brand: TableView.DATATYPES.TEXT,
        model: TableView.DATATYPES.TEXT,
        colour: TableView.DATATYPES.TEXT,
        gasolineLiters: TableView.DATATYPES.TEXT,
        priceHour: TableView.DATATYPES.TEXT,
        garage: TableView.DATATYPES.SELECT,
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
