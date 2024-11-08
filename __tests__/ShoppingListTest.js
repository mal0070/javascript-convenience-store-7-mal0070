import FILE_PATHS from "../src/constants/filePaths";
import fetchData from "../src/utils/DataGenerator";
import ShoppingList from "../src/models/ShoppingList";
import Stock from "../src/models/Stock";

describe('상품 구매 테스트', () => {
  test('입력한 상품 이름이 재고목록에 있으면 구매할 수 있다.', async () => {
    const initProducts = await fetchData(FILE_PATHS.PRODUCTS);
    const stock = new Stock(initProducts);
    
    const input = '[콜라-1],[사이다-1]';
    const shoppingList = new ShoppingList(input);

    ////뭔가 forEach돌아야할듯
    const inputName = shoppingList.items.get('name');

    if(stock.name.includes(inputName)){
      expect(shoppingList.items.get('name') 
    }

  });
});
