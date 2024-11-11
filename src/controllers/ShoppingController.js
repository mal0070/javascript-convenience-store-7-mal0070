import { InputView } from '../views/InputView.js';
import OutputView from '../views/OutputView.js';
import fetchData from '../utils/DataGenerator.js';
import FILE_PATHS from '../constants/filePaths.js';
import Stock from '../models/Stock.js';
import { Console } from '@woowacourse/mission-utils';
import Membership from '../models/Membership.js';

class ShoppingController {
  async run() {
    const initProducts = await fetchData(FILE_PATHS.PRODUCTS);
    const stock = new Stock(initProducts);
    OutputView.printStock(stock);

    let items;
    let isValidateItem = false;
    let totalPrice = 0;

    while(!isValidateItem){
      try {
        items = await InputView.readItem();
        for (const item of items) {
          totalPrice+= await stock.getTotalPrice(item);
          await stock.updateStock(item);
        }
        isValidateItem = true;
      } catch (error) {
        Console.print(error.message);
      }
    }

    let membershipAns = await InputView.askMembership();
    if(membershipAns === 'Y'){
      const membership = new Membership(totalPrice);
      OutputView.printRecipt(totalPrice,0,membership.discount,membership.getAppliedPrice(totalPrice));
    }
    if(membershipAns === 'N'){
      OutputView.printRecipt(totalPrice,0,0,money);
    }
  }
}

//나중에 while(true){} 전체 로직 넣고 n 입력시 break
export default ShoppingController;
