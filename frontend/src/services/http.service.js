class HttpService {
  constructor() {}
  get = endpoint => this._makeFetchRequest(endpoint, 'GET');
  put = (endpoint, data) => this._makeFetchRequest(endpoint, 'PUT', data);
  delete = endpoint => this._makeFetchRequest(endpoint, 'DELETE');
  post = (endpoint, data) => this._makeFetchRequest(endpoint, 'POST', data);

  _makeFetchRequest(url, method, data) {
    const options = {
      method: method,
      mode: 'cors',
      headers: {'Content-Type': 'application/json'},
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    return fetch(url, options).then(response => response.json());
  }

  //get
  //put <- update
  //post <- create
  //delete
}
