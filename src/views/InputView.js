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
};
