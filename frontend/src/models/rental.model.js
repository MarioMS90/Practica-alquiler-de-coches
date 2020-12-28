class Burger {
  constructor() {
    this.id = Burger.newId();
    this.type;
    this.name;
    this.price = 0;

    this._ingredients = [];
  }

  static lastId = 12;

  static newId() {
    Burger.lastId++;

    return Burger.lastId;
  }

  get ingredients() {
    return this._ingredients;
  }

  set ingredients(ingredients) {
    this._ingredients = ingredients;
  }
}
