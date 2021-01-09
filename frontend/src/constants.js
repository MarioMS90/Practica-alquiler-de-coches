const REGEXP_CLIENT = {
  DNI: /^[0-9]{8}[A-Z]$/,
  NAME: /^[a-zA-Zñáéíóú\s]{2,60}$/i,
  ADRESS: /^.{2,120}$/,
  PHONE: /((?<=^00|\+)34(6|7|9|8)\d{8}$)|(6|7|9|8)\d{8}$/,
};

const REGEXP_CAR = {
  REGISTRATION: /^([A-Z]{1,2})?\d{4}([A-Z]{2,3})$/,
  BRAND: /^[a-zA-Zñáéíóú\s]{2,30}$/i,
  MODEL: /^[a-zA-Zñáéíóú\s]{2,30}$/i,
  COLOUR: /^[a-zA-Zñáéíóú\s]{2,30}$/i,
  GASOLINE_LITERS: /^[0-9]{1,3}$/,
  PRICE_HOUR: /^\d+(\.\d{1,2})?$/,
};

const REGEXP_BOOKING = {
  DATE: /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}$/,
  TOTAL_PRICE: /^\d+(\.\d{1,2})?$/,
};

const REGEXP_GARAGE = {
  NAME: /^[a-zA-Zñáéíóú\s]{2,30}$/i,
};

const FORMAT_DATE = 'YYYY/MM/DD HH:mm:ss';
