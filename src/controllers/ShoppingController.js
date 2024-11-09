import { InputView } from '../views/InputView.js';
import OutputView from '../views/OutputView.js';
import fetchData from '../utils/DataGenerator.js';
import FILE_PATHS from '../constants/filePaths.js';
import Stock from '../models/Stock.js';
import { Console } from '@woowacourse/mission-utils';

class ShoppingController {
  async run() {
    const initProducts = await fetchData(FILE_PATHS.PRODUCTS);
    const stock = new Stock(initProducts);
    OutputView.printStock(stock);

    let items;
    let isValidateItem = false;

    while (!isValidateItem) {
      try {
        items = await InputView.readItem();
        this.validateItem(items, stock);
        isValidateItem = true;
      } catch (error) {
        Console.print(error.message);
      }
    }
    //테스트 통과하게끔 파일 불러오는 로직 수정

    //const promotions = await fetchData(FILE_PATHS.PROMOTION);
  }

  validateItem(items, stock) {
    for (const item of items) {
      const targetProducts = stock.getProductsByName(item.name);
      if (!targetProducts || targetProducts.length === 0) {
        throw new Error(
          '[ERROR] 존재하지 않는 상품입니다. 다시 입력해 주세요.'
        );
      }

      let totalQuantities = 0;
      targetProducts.forEach(
        (product) => (totalQuantities += product.quantity)
      );
      if (totalQuantities < item.quantity) {
        throw new Error(
          '[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.'
        );
      }
    }
    Console.print('구매시작');
    //return true;
  }
}

//나중에 while(true){} 전체 로직 넣고 n 입력시 break
export default ShoppingController;
