import { InputView } from '../views/InputView.js';
import OutputView from '../views/OutputView.js';
import fetchData from '../utils/DataGenerator.js';
import FILE_PATHS from '../constants/filePaths.js';

class ShoppingController {
  async run() {
    const initProducts = await fetchData(FILE_PATHS.PRODUCTS);
    OutputView.printProducts(initProducts);
    InputView.readItem();

    //const promotions = await fetchData(FILE_PATHS.PROMOTION);
  }
}

export default ShoppingController;
