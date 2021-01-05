class TableView {
  constructor({tableName, className, header, dataTypes}) {
    this.table = document.getElementById(tableName);
    this.body = this.table.tBodies[0];
    this.dataTypes = dataTypes;
    this.table.dataset.class = className;
    this.createHeader(header);

    this.isEdited = false;
    this.initLocalListeners();

    this.BUTTONS = {
      delete: 'assets/images/delete.svg',
      insert: 'assets/images/insert.svg',
    };

    this.FUNCTIONS_CREATE = {
      0: this.createText,
      1: this.createSelect,
      2: 3,
    };
  }

  static DATATYPES = {
    TEXT: 0,
    SELECT: 1,
    DATE: 2,
  };

  createHeader(header) {
    const row = document.createElement('tr');

    const cells = header.map(fieldName => {
      const cell = document.createElement('th');
      cell.textContent = fieldName;
      return cell;
    });
    const cellAction = document.createElement('th');
    cellAction.textContent = 'Acción';

    row.append(...cells, cellAction);
    this.table.tHead.appendChild(row);
  }

  initLocalListeners() {
    this.body.addEventListener('input', event => {
      if (event.target.classList.contains('editable')) {
        this.isEdited = true;
      }
    });

    this.body.addEventListener('input', event => {
      if (event.target.nodeName === 'SELECT') {
        const tdParent = event.target.parentElement;
        tdParent.dataset.id = event.target.value;

        if (tdParent.classList.contains('editable')) {
          this.isEdited = true;
        }
      }
    });
  }

  bindInsert(handler) {
    this.body.addEventListener('click', event => {
      if (event.target.dataset.type === 'insert') {
        const row = event.target.closest('tr');
        const params = this.getParamsFromRow(row);

        handler(params);
      }
    });
  }

  bindUpdate(handler) {
    this.body.addEventListener('focusout', event => {
      if (this.isEdited) {
        const row = event.target.closest('tr');
        const params = this.getParamsFromRow(row);

        handler(params);
        this.isEdited = false;
      }
    });
  }

  bindDelete(handler) {
    this.body.addEventListener('click', event => {
      if (event.target.dataset.type === 'delete') {
        const row = event.target.closest('tr');
        const params = this.getParamsFromRow(row);

        handler(params);
      }
    });
  }

  getParamsFromRow(row) {
    const params = Array.from(row.childNodes).reduce(
      (params, field) => ({
        ...params,
        [field.dataset.name]: field.firstChild
          ? field.dataset.id || field.textContent
          : field.textContent,
      }),
      {id: row.dataset.id, class: this.table.dataset.class},
    );
    const entries = Object.entries(params);

    return Object.fromEntries(entries.slice(0, entries.length - 1));
  }

  displayErrors(validations, id) {
    const row = id ? this.getRow(id) : this.body.lastChild;

    validations.forEach((validation, index) => {
      validation
        ? row.childNodes[index + 1].classList.remove('invalid')
        : row.childNodes[index + 1].classList.add('invalid');
    });
  }

  getRow = id => Array.from(this.body.childNodes).find(row => row.dataset.id === id);

  displayData({elements, selectElements}) {
    while (this.body.firstChild) {
      this.body.removeChild(this.body.firstChild);
    }

    elements.forEach(element => {
      const cells = this.createCells();

      cells.forEach(cell => {
        const fieldName = cell.dataset.name;

        if (this.dataTypes[fieldName] === TableView.DATATYPES.TEXT) {
          cell.appendChild(this.createText(element[fieldName]));
          cell.contentEditable = true;
          cell.classList.add('editable');
        } else if (this.dataTypes[fieldName] === TableView.DATATYPES.SELECT) {
          const select = this.createSelect(selectElements[fieldName]);
          select.value = element[fieldName] ? element[fieldName].id : 'null';
          cell.dataset.id = select.value;
          cell.classList.add('editable');
          cell.appendChild(select);
        }
      });

      cells[0].contentEditable = false;
      cells[0].classList.remove('editable');

      const button = this.createButton(this.BUTTONS.delete);
      cells[cells.length - 1].appendChild(button);

      const row = document.createElement('tr');
      row.append(...cells);

      row.dataset.id = element.id;
      this.body.appendChild(row);
    });

    const cells = this.createCells();

    for (const cell of cells) {
      const fieldName = cell.dataset.name;

      if (this.dataTypes[fieldName] === TableView.DATATYPES.SELECT) {
        const select = this.createSelect(selectElements[fieldName]);
        select.value = 'null';
        cell.dataset.id = select.value;
        cell.appendChild(select);
      } else if (this.dataTypes[fieldName] === TableView.DATATYPES.TEXT) {
        cell.contentEditable = true;
      }
    }
    cells[0].contentEditable = false;

    const button = this.createButton(this.BUTTONS.insert);
    cells[cells.length - 1].appendChild(button);

    const row = document.createElement('tr');
    row.append(...cells);

    this.body.appendChild(row);
  }

  createCells() {
    const cells = Object.values(this.dataTypes).map((_, index) => {
      const cell = document.createElement('td');
      cell.dataset.name = Object.keys(this.dataTypes)[index];

      return cell;
    });
    const cellAction = document.createElement('td');

    return [...cells, cellAction];
  }

  createText(text) {
    return document.createTextNode(text);
  }

  createSelect(items) {
    const select = document.createElement('select');

    const option = document.createElement('option');
    option.value = 'null';
    option.textContent = 'Selecciona';
    select.appendChild(option);

    items.forEach(item => {
      const option = document.createElement('option');
      option.value = item.id;
      option.textContent = item.name;

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

    icon.dataset.type = Object.keys(this.BUTTONS).find(key => type === this.BUTTONS[key]);

    return button;
  }
}
