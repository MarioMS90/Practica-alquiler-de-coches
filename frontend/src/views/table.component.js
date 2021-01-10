class TableComponent {
  constructor({tableId, className, header, dataTypes}) {
    this.table = document.getElementById(tableId);
    this.bodyTable = this.table.tBodies[0];
    this.dataTypes = dataTypes;
    this.table.dataset.class = className;
    this.createHeader(header);

    this._isEdited = false;
    this._initLocalListeners();

    this.buttons = {
      DELETE: 'assets/images/delete.svg',
      INSERT: 'assets/images/insert.svg',
    };

    this.DATATYPES_FUNCTIONS = {
      0: this.createTextNode,
      1: this.createSelect,
      2: this.createTextNode,
      3: this.createInputDate,
      4: this.createInputTime,
    };
  }

  static datatypes = {
    TEXT: 0,
    SELECT: 1,
    TEXT_DISABLED: 2,
    DATE: 3,
    TIME: 4,
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

  _initLocalListeners() {
    this.bodyTable.addEventListener('input', event => {
      if (event.target.classList.contains('updatable')) {
        this._isEdited = true;
      }
    });

    this.bodyTable.addEventListener('change', event => {
      if (event.target.classList.contains('input')) {
        this._isEdited = true;
      }
    });
  }

  bindInsert(handler) {
    this.bodyTable.addEventListener('click', event => {
      if (event.target.dataset.type === 'INSERT') {
        const row = event.target.closest('tr');
        const params = this.getParamsFromRow(row);

        handler(params);
      }
    });
  }

  bindUpdate(handler) {
    this.bodyTable.addEventListener('focusout', event => {
      if (this._isEdited) {
        const row = event.target.closest('tr');
        const params = this.getParamsFromRow(row);

        handler(params);
        this._isEdited = false;
      }
    });
  }

  bindDelete(handler) {
    this.bodyTable.addEventListener('click', event => {
      if (event.target.dataset.type === 'DELETE') {
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
        [field.dataset.name]: field.firstChild.value || field.textContent,
      }),
      {id: row.dataset.id, class: this.table.dataset.class},
    );

    const entries = Object.entries(params);
    return Object.fromEntries(entries.slice(0, entries.length - 1));
  }

  displayErrors(validations, id) {
    const row = id ? this.getRow(id) : this.bodyTable.lastChild;

    validations.forEach((validation, index) => {
      validation
        ? row.childNodes[index + 1].classList.remove('invalid')
        : row.childNodes[index + 1].classList.add('invalid');
    });
  }

  getRow = id => Array.from(this.bodyTable.childNodes).find(row => row.dataset.id === id);

  displayData({elements, selectElements}) {
    while (this.bodyTable.firstChild) {
      this.bodyTable.removeChild(this.bodyTable.firstChild);
    }

    elements.forEach(element => {
      const cells = this.createCells();

      //Crear fila para cada elemento
      for (let i = 0; i < cells.length - 1; i++) {
        const fieldName = cells[i].dataset.name;

        cells[i].append(
          this.DATATYPES_FUNCTIONS[this.dataTypes[fieldName]](
            element[fieldName],
            selectElements[fieldName],
          ),
        );
        cells[i].classList.add('updatable');
        if (this.dataTypes[fieldName] === TableComponent.datatypes.TEXT) {
          cells[i].contentEditable = true;
        }
      }

      const button = this.createButton(this.buttons.DELETE);
      cells[cells.length - 1].appendChild(button);

      const row = document.createElement('tr');
      row.append(...cells);

      row.dataset.id = element.id;
      this.bodyTable.appendChild(row);
    });

    //Crear fila de inserción
    const cells = this.createCells();

    for (let i = 0; i < cells.length - 1; i++) {
      const fieldName = cells[i].dataset.name;

      cells[i].append(
        this.DATATYPES_FUNCTIONS[this.dataTypes[fieldName]]('', selectElements[fieldName]),
      );
      if (this.dataTypes[fieldName] === TableComponent.datatypes.TEXT) {
        cells[i].contentEditable = true;
      }
    }

    const button = this.createButton(this.buttons.INSERT);
    cells[cells.length - 1].appendChild(button);

    const row = document.createElement('tr');
    row.append(...cells);

    this.bodyTable.appendChild(row);
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

  createTextNode(content) {
    const input = document.createTextNode(content);

    return input;
  }

  createSelect(value, selectElements) {
    const select = document.createElement('select');

    const option = document.createElement('option');
    option.value = 'null';
    option.textContent = 'Selecciona';
    select.appendChild(option);

    selectElements.forEach(item => {
      const option = document.createElement('option');
      option.value = item.id;
      option.textContent = item.name;

      select.appendChild(option);
    });
    if (value) {
      select.value = value.id;
      select.classList.add('updatable');
    }

    return select;
  }

  createInputDate(date) {
    const inputDate = document.createElement('input');
    inputDate.setAttribute('type', 'date');
    inputDate.value = date;
    if (date) {
      inputDate.classList.add('input');
    }

    return inputDate;
  }

  createInputTime(time) {
    const inputTime = document.createElement('input');
    inputTime.setAttribute('type', 'time');
    inputTime.value = time;
    if (time) {
      inputTime.classList.add('input');
    }

    return inputTime;
  }

  createButton(type) {
    const button = document.createElement('a');
    button.setAttribute('href', '#');

    const icon = document.createElement('img');
    icon.setAttribute('src', type);
    button.appendChild(icon);

    icon.dataset.type = Object.keys(this.buttons).find(key => type === this.buttons[key]);

    return button;
  }
}
