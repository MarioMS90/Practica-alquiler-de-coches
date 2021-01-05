class ClientView {
  constructor() {
    this.tableView = new TableView({
      tableName: 'clientsTable',
      className: 'Client',
      header: ['ID', 'DNI', 'Nombre', 'Dirección', 'Teléfono', 'Avalador'],
      dataTypes: {
        id: TableView.DATATYPES.TEXT,
        dni: TableView.DATATYPES.TEXT,
        name: TableView.DATATYPES.TEXT,
        adress: TableView.DATATYPES.TEXT,
        phone: TableView.DATATYPES.TEXT,
        guarantor: TableView.DATATYPES.SELECT,
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

    this.tableView.displayData(data);
  }
}
