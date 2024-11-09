import { InputView } from '../views/InputView.js';
import OutputView from '../views/OutputView.js';
import fetchData from '../utils/DataGenerator.js';
import FILE_PATHS from '../constants/filePaths.js';
import Stock from '../models/Stock.js';
import { Console } from '@woowacourse/mission-utils';

class ShoppingController {
  async run() {
    const initProducts = await fetchData(FILE_PATHS.PRODUCTS);
    const stock = new Stock(initProducts);//[name: qu: pr: promo: ]
    OutputView.printStock(stock);

    let items;
    let isValidateItem = false;

    while(!isValidateItem){
      try {
        items = await InputView.readItem();
        items.forEach(item => stock.updateStock(item));
        isValidateItem = true;
      } catch (error) {
        Console.print(error.message);
      }
    }

    const promotions = await fetchData(FILE_PATHS.PROMOTION);
    //프로모션 null -> 걍 구매
    //null이 아니면 
    //promotions에서 일치하는거 찾아서 날짜보기. 현재날짜가 더 적으면 구매
    //
  }
}

//나중에 while(true){} 전체 로직 넣고 n 입력시 break
export default ShoppingController;
