class CarView extends TableView {
  constructor() {
    const carsTable = document.getElementById('carsTable');
    carsTable.dataset.class = 'Car';
    super(carsTable);
    this.carsTable = carsTable;

    this.BUTTONS = {
      delete: 'assets/images/delete.svg',
      insert: 'assets/images/insert.svg',
    };
  }

  bindInsertCar(handler) {
    super.bindInsert(handler);
  }

  bindUpdateCar(handler) {
    super.bindUpdate(handler);
  }

  bindDeleteCar(handler) {
    super.bindDelete(handler);
  }

  displayErrors(validations, id) {
    const row = id ? this.getRow(id) : this.carsTable.lastChild;

    validations.forEach((validation, index) => {
      validation
        ? row.childNodes[index].classList.remove('invalid')
        : row.childNodes[index].classList.add('invalid');
    });
  }

  getRow = id => Array.from(this.carsTable.childNodes).find(row => row.dataset.id === id);

  displayCars({cars, garages}) {
    while (this.carsTable.firstChild) {
      this.carsTable.removeChild(this.carsTable.firstChild);
    }

    cars.forEach(car => {
      const cells = this.createCells(garages, this.BUTTONS.delete, car);
      const row = document.createElement('tr');
      row.dataset.id = car.id;
      row.append(...cells);
      this.carsTable.appendChild(row);
    });

    const cells = this.createCells(garages, this.BUTTONS.insert);
    const row = document.createElement('tr');
    row.append(...cells);
    this.carsTable.appendChild(row);
  }

  createCells(garages, buttonType, car) {
    const cellRegistration = document.createElement('td');
    const cellBrand = document.createElement('td');
    const cellModel = document.createElement('td');
    const cellColour = document.createElement('td');
    const cellGasolineLiters = document.createElement('td');
    const cellPriceHour = document.createElement('td');
    const cellGarage = document.createElement('td');
    const cellButton = document.createElement('td');
    cellRegistration.dataset.name = 'registration';
    cellBrand.dataset.name = 'brand';
    cellModel.dataset.name = 'model';
    cellColour.dataset.name = 'colour';
    cellGasolineLiters.dataset.name = 'gasolineLiters';
    cellPriceHour.dataset.name = 'priceHour';
    cellGarage.dataset.name = 'garage';

    const select = this.createSelect(garages);
    const button = this.createButton(buttonType);

    cellGarage.appendChild(select);
    cellButton.appendChild(button);

    const cells = [
      cellRegistration,
      cellBrand,
      cellModel,
      cellColour,
      cellGasolineLiters,
      cellPriceHour,
      cellGarage,
      cellButton,
    ];

    if (car) {
      cellRegistration.textContent = car.registration;
      cellBrand.textContent = car.brand;
      cellModel.textContent = car.model;
      cellColour.textContent = car.colour;
      cellGasolineLiters.textContent = car.gasolineLiters;
      cellPriceHour.textContent = car.priceHour;

      select.value = car.garage.id;
      cellGarage.dataset.id = select.value;

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

  createSelect(garages) {
    const select = document.createElement('select');

    const option = document.createElement('option');
    option.value = '';
    option.textContent = 'Selecciona';
    select.appendChild(option);

    garages.forEach(garage => {
      const option = document.createElement('option');
      option.value = garage.id;
      option.textContent = garage.name;

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
