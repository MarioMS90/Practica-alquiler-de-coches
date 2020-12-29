class HttpService {
  constructor() {}
  get = endpoint => this._makeFetchRequest(endpoint, 'GET');

  put = (endpoint, options) => this._makeFetchRequest(endpoint, 'PUT', options);
  delete = endpoint => this._makeFetchRequest(endpoint, 'DELETE');

  post = (endpoint, options) => this._makeFetchRequest(endpoint, 'POST', options);

  handleError = response => {
    if (response.status > 300 || response.status < 200) {
      throw new Error('Mi error');
    }
  };

  _makeFetchRequest(url, method, data = null) {
    return fetch(url, {
      method: method,
      mode: 'cors',
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => this.handleError(response))
      .then(response => response.json());
  }

  //get
  //put <- update
  //post <- create
  //delete
}
