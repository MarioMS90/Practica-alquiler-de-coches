class TpvService {
  API_ENDPOINT = '';

  constructor() {
    this.addedProducts = [];

    fetch(`products.json`)
      .then(products => products.json())
      .then(({products}) => {
        this.products = products;
      });

    this.BURGERS_NAME = {
      6: 'Burger de ternera',
      7: 'Burger de pollo',
      8: 'Burger de lentejas',
    };
  }

  bindAddedProduct(callback) {
    this.onAddedProduct = callback;
  }

  bindRemovedProduct(callback) {
    this.onRemovedProduct = callback;
  }

  bindAddedIngredient(callback) {
    this.onAddedIngredient = callback;
  }

  bindRemovedIngredient(callback) {
    this.onRemovedIngredient = callback;
  }

  addProduct(productId) {
    this.addProductToList(this.products[productId - 1]);

    this.onAddedProduct(this.products[productId - 1], this.totalPrice(this.addedProducts));
  }

  addProductToList = product => (this.addedProducts = [...this.addedProducts, product]);

  removeProduct(productId) {
    this.addedProducts = this.filterProductsFromList(
      this.addedProducts,
      this.products[productId - 1],
    );

    this.onRemovedProduct(this.products[productId - 1], this.totalPrice(this.addedProducts));
  }

  filterProductsFromList = (list, productToRemove) =>
    list.filter((_, index) => index != this.firstIndex(list, productToRemove));

  firstIndex = (list, productToFind) => list.findIndex(product => product === productToFind);

  addIngredient(productId) {
    const ingredient = this.products[productId - 1];

    if (this.sameType(ingredient).length === 2) {
      return;
    }

    this.addIngredientToBurger(ingredient);
    this.onAddedIngredient(ingredient, this.totalPrice(this.customBurger.ingredients));
  }

  addIngredientToBurger = ingredient =>
    (this.customBurger.ingredients = [...this.customBurger.ingredients, ingredient]);

  sameType = ingredientToFind =>
    this.customBurger.ingredients.filter(ingredient => ingredient === ingredientToFind);

  removeIngredient(productId) {
    this.customBurger.ingredients = this.filterProductsFromList(
      this.customBurger.ingredients,
      this.products[productId - 1],
    );

    this.onRemovedIngredient(
      this.products[productId - 1],
      this.totalPrice(this.customBurger.ingredients),
    );
  }

  addCustomBurger() {
    this.customBurger.price = this.totalPrice(this.customBurger.ingredients);
    this.products = [...this.products, Object.fromEntries(Object.entries(this.customBurger))];

    this.addProduct(this.customBurger.id);

    this.customBurger = null;
  }

  removeIngredientFromBurger = ingredient => (this.customBurger.removeIngredient = ingredient);

  addBurgerType(productId) {
    if (!this.customBurger) {
      this.customBurger = new Burger();
    }
    if (this.customBurger.name) {
      this.removeIngredient(this.customBurger.type);
    }

    this.customBurger.type = productId;
    this.customBurger.name = this.BURGERS_NAME[productId];

    this.addIngredient(productId);
  }

  totalPrice = products =>
    products.reduce((totalPrice, product) => (totalPrice += product.price), 0);
}
