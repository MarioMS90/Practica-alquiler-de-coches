class Car {
  constructor({id, registration, brand, model, colour, garage, gasolineLiters, priceHour}) {
    this.id = id;
    this.registration = registration;
    this.brand = brand;
    this.model = model;
    this.colour = colour;
    this.garage = garage;
    this.gasolineLiters = gasolineLiters;
    this.priceHour = priceHour;
  }

  set registration(registration) {
    if (!REGEXP_CAR.REGISTRATION.test(registration)) {
      throw Error('ERROR: La matrícula no es válida.');
    }

    this._registration = registration;
  }

  get registration() {
    return this._registration;
  }

  set brand(brand) {
    if (!REGEXP_CAR.BRAND.test(brand)) {
      throw Error('ERROR: La marca no es válida.');
    }

    this._brand = brand;
  }

  get brand() {
    return this._brand;
  }

  set model(model) {
    if (!REGEXP_CAR.MODEL.test(brand)) {
      throw Error('ERROR: El modelo no es válido.');
    }

    this._model = model;
  }

  get model() {
    return this._model;
  }

  set colour(colour) {
    if (!REGEXP_CAR.COLOUR.test(colour)) {
      throw Error('ERROR: El color no es válido.');
    }

    this._colour = colour;
  }

  get colour() {
    return this._colour;
  }

  set gasolineLiters(gasolineLiters) {
    if (!REGEXP_CAR.GASOLINE_LITERS.test(gasolineLiters)) {
      throw Error('ERROR: Los litros de gasolina no son válidos.');
    }

    this._gasolineLiters = gasolineLiters;
  }

  get gasolineLiters() {
    return this._gasolineLiters;
  }

  set priceHour(priceHour) {
    if (!REGEXP_CAR.PRICE_HOUR.test(priceHour)) {
      throw Error('ERROR: El precio por hora no es válido.');
    }

    this._priceHour = priceHour;
  }

  get priceHour() {
    return this._priceHour;
  }
}
