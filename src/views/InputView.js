import { Console } from '@woowacourse/mission-utils';
import parseInput from '../utils/InputParser.js';

export const InputView = {
  async readItem() {
    try {
      const input = await Console.readLineAsync('\n구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n');
      return parseInput(input);
    } catch (error) {
      Console.print(error.message);
      return this.readItem();
    }
  },

  async askAppliedPromotion(item, freeItems){
    try {
      const ans = await Console.readLineAsync(`현재 ${item.name}은(는) ${freeItems}개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)`);
      return ans;
    } catch (error) {
      Console.print(error.message);
      return this.askAppliedPromotion(item, freeItems);
    }
  },

  async askBuySubRegular(item, restFreeItems){
    try {
      const ans = await Console.readLineAsync(`현재 ${item}은 ${restFreeItems}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)`);
    return ans;
    } catch (error) {
      Console.print(error.message);
      return this.askBuySubRegular(item, restFreeItems);
    }
  },
  
  async askMembership(){
    try {
      const ans = await Console.readLineAsync('멤버십 할인을 받으시겠습니까? (Y/N)\n');
      return ans;
    } catch (error){
      Console.print("[ERROR] 잘못된 입력입니다. 다시 입력해 주세요.");
      return this.askMembership();
    }
  }
};
