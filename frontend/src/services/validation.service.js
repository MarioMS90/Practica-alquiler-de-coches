class ValidationService {
  constructor() {
    this.CLIENT_VALIDATION = {
      dni: this._isValidDni,
      name: this._isValidName,
      adress: this._isValidAdress,
      phone: this._isValidPhone,
    };
  }

  _isValidDni = dni => REGEXP_CLIENT.DNI.test(dni);
  _isValidName = name => REGEXP_CLIENT.NAME.test(name);
  _isValidAdress = adress => REGEXP_CLIENT.ADRESS.test(adress);
  _isValidPhone = phone => REGEXP_CLIENT.PHONE.test(phone);
}
