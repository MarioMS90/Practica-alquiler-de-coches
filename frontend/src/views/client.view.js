class ClientView {
  constructor() {
    this.tableView = new TableView({
      tableId: 'clientsTable',
      className: 'Client',
      header: ['ID', 'DNI', 'Nombre', 'Dirección', 'Teléfono', 'Avalador'],
      dataTypes: {
        id: TableView.datatypes.TEXT_DISABLED,
        dni: TableView.datatypes.TEXT,
        name: TableView.datatypes.TEXT,
        adress: TableView.datatypes.TEXT,
        phone: TableView.datatypes.TEXT,
        guarantor: TableView.datatypes.SELECT,
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
