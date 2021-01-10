class CarView {
  constructor() {
    this.table = new TableComponent({
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
        id: TableComponent.datatypes.TEXT_DISABLED,
        registration: TableComponent.datatypes.TEXT,
        brand: TableComponent.datatypes.TEXT,
        model: TableComponent.datatypes.TEXT,
        colour: TableComponent.datatypes.TEXT,
        gasolineLiters: TableComponent.datatypes.TEXT,
        priceHour: TableComponent.datatypes.TEXT,
        garage: TableComponent.datatypes.SELECT,
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

    this.table.displayData(data);
  }
}
