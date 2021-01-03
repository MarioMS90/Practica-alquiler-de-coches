class ClientView extends TableView {
  constructor() {
    const clientsTable = document.getElementById('clientsTable');
    clientsTable.dataset.class = 'Client';
    super(clientsTable);
    this.clientsTable = clientsTable;

    this.BUTTONS = {
      delete: 'assets/images/delete.svg',
      insert: 'assets/images/insert.svg',
    };
  }

  bindInsertClient(handler) {
    super.bindInsert(handler);
  }

  bindUpdateClient(handler) {
    super.bindUpdate(handler);
  }

  bindDeleteClient(handler) {
    super.bindDelete(handler);
  }

  displayErrors(validations, id) {
    const row = id ? this.getRow(id) : this.clientsTable.lastChild;

    validations.forEach((validation, index) => {
      validation
        ? row.childNodes[index].classList.remove('invalid')
        : row.childNodes[index].classList.add('invalid');
    });
  }

  getRow = id => Array.from(this.clientsTable.childNodes).find(row => row.dataset.id === id);

  displayClients(clients) {
    while (this.clientsTable.firstChild) {
      this.clientsTable.removeChild(this.clientsTable.firstChild);
    }

    clients.forEach(client => {
      const cells = this.createCells(clients, this.BUTTONS.delete, client);
      const row = document.createElement('tr');
      row.dataset.id = client.id;
      row.append(...cells);
      this.clientsTable.appendChild(row);
    });

    const cells = this.createCells(clients, this.BUTTONS.insert);
    const row = document.createElement('tr');
    row.append(...cells);
    this.clientsTable.appendChild(row);
  }

  createCells(clients, buttonType, client) {
    const cellDni = document.createElement('td');
    const cellName = document.createElement('td');
    const cellAdress = document.createElement('td');
    const cellPhone = document.createElement('td');
    const cellGuarantor = document.createElement('td');
    const cellButton = document.createElement('td');
    const select = this.createSelect(clients);
    const button = this.createButton(buttonType);
    cellDni.dataset.name = 'dni';
    cellName.dataset.name = 'name';
    cellAdress.dataset.name = 'adress';
    cellPhone.dataset.name = 'phone';
    cellGuarantor.dataset.name = 'guarantor';

    cellGuarantor.appendChild(select);
    cellButton.appendChild(button);

    const cells = [cellDni, cellName, cellAdress, cellPhone, cellGuarantor, cellButton];

    if (client) {
      cellDni.textContent = client.dni;
      cellName.textContent = client.name;
      cellAdress.textContent = client.adress;
      cellPhone.textContent = client.phone;

      select.value = client.guarantor ? client.guarantor.id : null;
      cellGuarantor.dataset.id = select.value;

      for (const cell of cells) {
        cell.contentEditable = true;
        cell.classList.add('editable');
      }
      cellButton.contentEditable = false;
      cellButton.classList.remove('editable');
    } else {
      for (const cell of cells) {
        cell.contentEditable = true;
      }
      cellButton.contentEditable = false;
    }

    return cells;
  }

  createSelect(clients) {
    const select = document.createElement('select');

    const option = document.createElement('option');
    option.value = null;
    option.textContent = 'No';
    select.appendChild(option);

    clients.forEach(client => {
      const option = document.createElement('option');
      option.value = client.id;
      option.textContent = client.name;

      select.appendChild(option);
    });

    return select;
  }

  createButton(type) {
    const button = document.createElement('a');
    button.setAttribute('href', '#');

    const icon = document.createElement('img');
    icon.setAttribute('src', type);
    button.appendChild(icon);

    button.firstChild.dataset.type = Object.keys(this.BUTTONS).find(
      key => this.BUTTONS[key] === type,
    );

    return button;
  }
}
