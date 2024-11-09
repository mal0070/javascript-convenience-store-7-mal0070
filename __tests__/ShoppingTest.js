import FILE_PATHS from '../src/constants/filePaths';
import fetchData from '../src/utils/DataGenerator';
import Stock from '../src/models/Stock';
import parseInput from '../src/utils/InputParser';
import validateItem from '../src/utils/ItemValidator';

describe('상품 구매 가능 여부 테스트', () => {
  test('입력한 상품 이름이 재고목록에 있고, 수량이 남아있으면 구매할 수 있다.', async () => {
    const initProducts = await fetchData(FILE_PATHS.PRODUCTS);
    const stock = new Stock(initProducts);
    const input = '[콜라-1],[사이다-1]';

    const parsedInputArray = parseInput(input);

    expect(validateItem(parsedInputArray, stock)).toBe(true);
      /*if (targetProducts.length === 2) {
        targetProducts.filter((product) => product.promotion); //not null. 즉 Promotion 상품 선택
      }
      targetProducts[0].quantity*/
    });
    //예외테스트
  });
  
//escribe("프로모션 상품 구매 테스트")
