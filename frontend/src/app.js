//tpvController = new TpvController(new TpvView(), new TpvService());

/*const URL_SERVER = 'http://localhost';
const PORT_SERVER = 3000;
const handleError = error => {
  console.error('ERROR desde FETCH', error);
  //
};
const POST_ENDPOINT = `${URL_SERVER}:${PORT_SERVER}/posts`;
const options = {
  method: 'GET',
};
const optionsDelete = {
  method: 'DELETE',
};
fetch(POST_ENDPOINT, options)
  .then(response => response.json())
  .then(posts => console.log(posts));

fetch(`${POST_ENDPOINT}/2`, optionsDelete)
  .then(response => response.json())
  .then(posts => console.log(posts))
  .catch(error => console.log('El error desde el catch'));

fetch(POST_ENDPOINT, options)
  .then(response => response.json())
  .then(posts => console.log(posts));*/

const startDate = moment('21/05/1990 20:15:00', FORMAT_DATE);
const endDate = moment('26/05/1990 22:16:00', FORMAT_DATE);

console.log(Math.ceil(moment.duration(endDate.diff(startDate)).asHours())); //CALCULAR HORAS ENTRE DOS DATETIMES

const paramsBooking = {
  id: 2,
  idClient: 3,
  startDate: startDate,
  endDate: endDate,
  totalPrice: 23,
  bookingDetails: [],
};

const paramsClient = {
  dni: '25737817N',
  name: 'Mario Muñoz',
  adress: 'C/Loma del Colegial Nº9 P1 1ºB 29620 Torremolinos (Málaga)',
  phone: '952388878',
};

const booking = new Booking(paramsBooking);
const client = new Client(paramsClient);

console.log(booking);
