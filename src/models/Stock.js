import fetchData from '../utils/DataGenerator';
import FILE_PATHS from '../constants/filePaths';

//재고 상황
class Stock {
  #products = []; //이 안에 Product 객체들이 있음
  constructor(products) {
    this.#products =  products;
  }

  async loadInitialData() {
    const products = await fetchData(FILE_PATHS.PRODUCTS); //product 객체가 만들어짐
    return products;
  }
}

export default Stock;
