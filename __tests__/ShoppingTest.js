import FILE_PATHS from '../src/constants/filePaths';
import fetchData from '../src/utils/DataGenerator';
import Stock from '../src/models/Stock';
import parseInput from '../src/utils/ParsingInput';

describe('상품 구매 가능 여부 테스트', () => {
  test('입력한 상품 이름이 재고목록에 있고, 수량이 남아있으면 구매할 수 있다.', async () => {

    const initProducts = await fetchData(FILE_PATHS.PRODUCTS);
    const stock = new Stock(initProducts); //[{name: ddd, quantiy: .... price:..., promotion: ....},{}]

    const input = '[콜라-1],[사이다-1]';

    const parsedInputArray = parseInput(input); //[{name: 사이다, quantity: 2}, {name: 감자칩, quantity:1}]
    parsedInputArray.forEach((parsedInput) => {
      const targetProducts = stock.filter((product) => product.name === parsedInput.name); //{name: 사이다, quantity:2, promotion: dd},{}
      
      let totalQuantities = 0;
      targetProducts.forEach((product)=> totalQuantities += product.quantity);
      if(totalQuantities >= parsedInput.quantity){
        return true;
      }
      /*if (targetProducts.length === 2) {
        targetProducts.filter((product) => product.promotion); //not null. 즉 Promotion 상품 선택
      }
      targetProducts[0].quantity*/
    });
  });
});
