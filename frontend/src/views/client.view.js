class ClientView {
  constructor() {
    this.table = new TableComponent({
      tableId: 'clientsTable',
      className: 'Client',
      header: ['ID', 'DNI', 'Nombre', 'Dirección', 'Teléfono', 'Avalador'],
      dataTypes: {
        id: TableComponent.datatypes.TEXT_DISABLED,
        dni: TableComponent.datatypes.TEXT,
        name: TableComponent.datatypes.TEXT,
        adress: TableComponent.datatypes.TEXT,
        phone: TableComponent.datatypes.TEXT,
        guarantor: TableComponent.datatypes.SELECT,
      },
    });
  }

  displayClients(clients) {
    const data = {
      elements: clients,
      selectElements: {
        guarantor: clients,
      },
    };

    this.table.displayData(data);
  }
}
