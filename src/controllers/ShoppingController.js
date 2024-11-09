import { InputView } from '../views/InputView.js';
import OutputView from '../views/OutputView.js';
import fetchData from '../utils/DataGenerator.js';
import FILE_PATHS from '../constants/filePaths.js';
import Stock from '../models/Stock.js';
import { Console } from '@woowacourse/mission-utils';
import validateItem from '../utils/ItemValidator.js';

class ShoppingController {
  async run() {
    const initProducts = await fetchData(FILE_PATHS.PRODUCTS);
    const stock = new Stock(initProducts);
    OutputView.printStock(stock);

    let items;
    let isValidateItem = false;

    while(!isValidateItem){
      try {
        items = await InputView.readItem();
        validateItem(items, stock);
        isValidateItem = true;
      } catch (error) {
        Console.print(error.message);
      }
    }
    //const promotions = await fetchData(FILE_PATHS.PROMOTION);
  }
}

//나중에 while(true){} 전체 로직 넣고 n 입력시 break
export default ShoppingController;
