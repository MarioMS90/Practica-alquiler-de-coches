class ClientService {
  CLIENTS_ENDPOINT = `${API_URL}:${PORT}/clients`;

  constructor(httpService) {
    this.httpService = httpService;

    this.clients = [];
    this.handleError = (name, error) => console.error(`ERROR ${name} en ClientService.`, error);
  }

  findAll = () => {
    return this.httpService
      .get(this.CLIENTS_ENDPOINT)
      .then(
        clients =>
          (this.clients = clients.map(client => {
            client.guarantor = clients.find(guarantor => client.idGuarantor === guarantor.id);
            return new Client(client);
          })),
      )
      .catch(error => this.handleError('findAll', error));
  };

  update = client => {
    const params = {
      dni: client.dni,
      name: client.name,
      adress: client.adress,
      phone: client.phone,
      guarantor: client.guarantor,
    };

    return this.httpService
      .put(`${this.CLIENTS_ENDPOINT}/${client.id}`, params)
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
