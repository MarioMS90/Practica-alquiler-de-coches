class CarService {
  CARS_ENDPOINT = `${API_URL}:${PORT}/cars`;
  GARAGES_ENDPOINT = `${API_URL}:${PORT}/GARAGES`;

  constructor(httpService) {
    this.httpService = httpService;

    this.cars = [];
    this.garages = [];

    this.handleError = (name, error) => console.error(`ERROR ${name} en CarsService.`, error);
  }

  findById = id => this.cars.find(car => car.id === id);

  findAll = () => {
    return this.findGarages()
      .then(garages =>
        this.httpService.get(this.CARS_ENDPOINT).then(
          cars =>
            (this.cars = cars.map(car => {
              car.garage = garages.find(garage => car.garage === garage.id);
              return new Car(car);
            })),
        ),
      )
      .then(_ => ({cars: this.cars, garages: this.garages}))
      .catch(error => this.handleError('findAll', error));
  };

  findGarages = () =>
    this.httpService
      .get(this.GARAGES_ENDPOINT)
      .then(garages => (this.garages = garages.map(garage => new Garage(garage))))
      .catch(error => this.handleError('findAll', error));

  insert = car => {
    return this.httpService
      .post(`${this.CARS_ENDPOINT}`, car)
      .then(car => car)
      .catch(error => this.handleError('update', error));
  };

  update = car => {
    return this.httpService
      .put(`${this.CARS_ENDPOINT}/${car.id}`, car)
      .then(car => car)
      .catch(error => this.handleError('update', error));
  };

  delete = id => {
    return this.httpService
      .delete(`${this.CARS_ENDPOINT}/${id}`)
      .then(car => car)
      .catch(error => this.handleError('delete', error));
  };
}
