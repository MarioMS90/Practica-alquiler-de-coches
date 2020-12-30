class BookingView {
  constructor() {
    this.REMOVE_ICON = 'assets/images/delete.svg';

    this.clientsTable = document.getElementById('clientsTable');

    this._isEdited = false;
    this._initLocalListeners();

    this.CLIENT_PARAMS = {
      dni: 0,
      name: 1,
      adress: 2,
      phone: 3,
      guarantor: 4,
    };
  }

  _initLocalListeners() {
    this.clientsTable.addEventListener('input', event => {
      this._isEdited = true;
    });
  }

  getClientFromRow(row) {
    const params = row.childNodes;

    return {
      id: row.dataset.id,
      dni: params[this.CLIENT_PARAMS.dni].textContent,
      name: params[this.CLIENT_PARAMS.name].textContent,
      adress: params[this.CLIENT_PARAMS.adress].textContent,
      phone: params[this.CLIENT_PARAMS.phone].textContent,
      guarantor: params[this.CLIENT_PARAMS.guarantor].dataset.id,
    };
  }

  bindUpdateClient(handler) {
    this.clientsTable.addEventListener('focusout', event => {
      if (this._isEdited) {
        const row = event.target.closest('tr');
        const client = this.getClientFromRow(row);

        handler(client);
        this._isEdited = false;
      }
    });
  }

  bindDeleteClient(handler) {
    this.clientsTable.addEventListener('click', event => {
      if (event.target.dataset.type === 'delete') {
        const id = event.target.closest('tr').dataset.id;

        handler(id);
      }
    });
  }

  displayClientError(error) {
    console.log(this.clientsTable.childNodes);
  }

  displayClients(clients) {
    while (this.clientsTable.firstChild) {
      this.clientsTable.removeChild(this.clientsTable.firstChild);
    }

    clients.forEach(client => {
      const row = document.createElement('tr');
      row.dataset.id = client.id;

      const colDni = document.createElement('td');
      const colName = document.createElement('td');
      const colAdress = document.createElement('td');
      const colPhone = document.createElement('td');
      const colGuarantor = document.createElement('td');
      const colRemove = document.createElement('td');

      colDni.contentEditable = true;
      colName.contentEditable = true;
      colAdress.contentEditable = true;
      colPhone.contentEditable = true;
      colGuarantor.contentEditable = true;

      colDni.textContent = client.dni;
      colName.textContent = client.name;
      colAdress.textContent = client.adress;
      colPhone.textContent = client.phone;

      if (client.guarantor) {
        colGuarantor.textContent = client.guarantor.name;
        colGuarantor.dataset.id = client.guarantor.id;
      } else {
        colGuarantor.textContent = 'No';
      }

      colRemove.appendChild(this.createRemoveButton());

      row.append(colDni, colName, colAdress, colPhone, colGuarantor, colRemove);

      clientsTable.appendChild(row);
    });
  }

  createRemoveButton() {
    const button = document.createElement('a');
    button.setAttribute('href', '#');

    const icon = document.createElement('img');
    icon.setAttribute('src', this.REMOVE_ICON);
    icon.dataset.type = 'delete';

    button.appendChild(icon);
    return button;
  }
}
