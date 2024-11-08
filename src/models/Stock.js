import fetchData from './DataGenerator';

//재고 상황
class Stock {
  #products = [];
  constructor(products) {
    this.#products =  products;
  }

  async loadInitialData() {
    const products = await fetchData(
      '/Users/imina/Desktop/wootechco/javascript-convenience-store-7-mal0070/public/products.md'
    ); //product 객체가 만들어짐
    return products;
  }
}
