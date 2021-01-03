class ClientService {
  CLIENTS_ENDPOINT = `${API_URL}:${PORT}/clients`;

  constructor(httpService) {
    this.httpService = httpService;

    this.clients = [];

    this.handleError = (name, error) => console.error(`ERROR ${name} en ClientService.`, error);
  }

  findById = id => this.clients.find(client => client.id === id);

  findAll = () => {
    return this.httpService
      .get(this.CLIENTS_ENDPOINT)
      .then(
        clients =>
          (this.clients = clients.map(client => {
            client.guarantor = clients.find(guarantor => client.guarantor === guarantor.id);
            return new Client(client);
          })),
      )
      .catch(error => this.handleError('findAll', error));
  };

  insert = client => {
    return this.httpService
      .post(`${this.CLIENTS_ENDPOINT}`, client)
      .then(client => client)
      .catch(error => this.handleError('update', error));
  };

  update = client => {
    return this.httpService
      .put(`${this.CLIENTS_ENDPOINT}/${client.id}`, client)
      .then(client => client)
      .catch(error => this.handleError('update', error));
  };

  delete = id => {
    return this.httpService
      .delete(`${this.CLIENTS_ENDPOINT}/${id}`)
      .then(client => client)
      .catch(error => this.handleError('delete', error));
  };
}
