class Client {
  constructor({id, dni, name, adress, phone, guarantor}) {
    this.id = id;
    this.dni = dni;
    this.name = name;
    this.adress = adress;
    this.phone = phone;
    this.guarantor = guarantor;
  }

  set dni(dni) {
    if (!REGEXP_CLIENT.DNI.test(dni)) {
      throw Error('ERROR: El dni no es válido.');
    }

    this._dni = dni;
  }

  get dni() {
    return this._dni;
  }

  set name(name) {
    if (!REGEXP_CLIENT.NAME.test(name)) {
      throw Error('ERROR: El nombre no es válido.');
    }

    this._name = name;
  }

  get name() {
    return this._name;
  }

  set adress(adress) {
    if (!REGEXP_CLIENT.ADRESS.test(adress)) {
      throw Error('ERROR: La dirección no es válida.');
    }

    this._adress = adress;
  }

  get adress() {
    return this._adress;
  }

  set phone(phone) {
    if (!REGEXP_CLIENT.PHONE.test(phone)) {
      throw Error('ERROR: El teléfono no es válido.');
    }

    this._phone = phone;
  }

  get phone() {
    return this._phone;
  }
}
