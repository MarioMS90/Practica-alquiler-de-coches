//tpvController = new TpvController(new TpvView(), new TpvService());

const URL_SERVER = 'http://localhost';
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
  .then(posts => console.log(posts));
