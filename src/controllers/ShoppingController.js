import { InputView } from '../views/InputView.js';
import OutputView from '../views/OutputView.js';
import fetchData from '../models/DataGenerator.js';
import FILE_PATHS from '../constants/filePaths.js';

class ShoppingController {
  async run() {
    const products = await fetchData(FILE_PATHS.PRODUCTS);
    OutputView.printProducts(products);
    InputView.readItem();

    //const promotions = await fetchData(FILE_PATHS.PROMOTION);
  }
}

export default ShoppingController;
