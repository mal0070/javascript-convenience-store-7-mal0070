//재고 상황
class Stock {
  #products = [];
  constructor(products) {
    this.#products = products;
  }

  getProducts() {
    return this.#products;
  }

  getProductsByName(name) {
    return this.#products.filter((product) => product.name === name);
  }
}

export default Stock;
