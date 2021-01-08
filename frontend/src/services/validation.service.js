class ValidationService {
  constructor() {
    this.CLIENT = {
      dni: this._isValidDni,
      name: this._isValidName,
      adress: this._isValidAdress,
      phone: this._isValidPhone,
    };

    this.CAR = {
      registration: this._isValidRegistration,
      brand: this._isValidBrand,
      model: this._isValidModel,
      colour: this._isValidColour,
      gasolineLiters: this._isValidGasolineLiters,
      priceHour: this._isValidPriceHour,
      garage: this._isValidGarage,
    };

    this.BOOKING = {
      startDatetime: this._isValidStartDatetime,
      endDatetime: this._isValidEndDatetime,
    };

    this.VALIDATIONS = {
      Client: this.CLIENT,
      Car: this.CAR,
    };
  }

  _isValidDni = dni => REGEXP_CLIENT.DNI.test(dni);
  _isValidName = name => REGEXP_CLIENT.NAME.test(name);
  _isValidAdress = adress => REGEXP_CLIENT.ADRESS.test(adress);
  _isValidPhone = phone => REGEXP_CLIENT.PHONE.test(phone);

  _isValidRegistration = registration => REGEXP_CAR.REGISTRATION.test(registration);
  _isValidBrand = brand => REGEXP_CAR.BRAND.test(brand);
  _isValidModel = model => REGEXP_CAR.MODEL.test(model);
  _isValidColour = colour => REGEXP_CAR.COLOUR.test(colour);
  _isValidGasolineLiters = gasolineLiters => REGEXP_CAR.GASOLINE_LITERS.test(gasolineLiters);
  _isValidPriceHour = priceHour => REGEXP_CAR.PRICE_HOUR.test(priceHour);
  _isValidGarage = garage => garage != 'null';

  _isValidStartDatetime = startDatetime => {
    this.startDatetime = startDatetime;
    return REGEXP_BOOKING.DATE.test(
      startDatetime.format(FORMAT_DATE) && moment().diff(startDatetime) < 0,
    );
  };
  _isValidEndDatetime = endDatetime =>
    REGEXP_BOOKING.DATE.test(
      endDatetime.format(FORMAT_DATE) &&
        endDatetime.diff(moment(this.startDatetime, FORMAT_DATE)) < 0,
    );
}
