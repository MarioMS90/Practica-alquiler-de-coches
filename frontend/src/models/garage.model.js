class Garage {
  constructor({id, name}) {
    this.id = id;
    this.name = name;
  }

  set name(name) {
    if (!REGEXP_GARAGE.NAME.test(name)) {
      throw Error('ERROR: El nombre no es válido.');
    }

    this._name = name;
  }

  get name() {
    return this._name;
  }
}
