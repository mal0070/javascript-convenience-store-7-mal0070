import { Console } from "@woowacourse/mission-utils";

const OutputView = {
  printStock(stock) {
    Console.print('안녕하세요. W편의점입니다.\n현재 보유하고 있는 상품입니다.\n');
    
    const products = stock.getProducts();
    
    products.forEach(product => {
      let printedPrice = product.price.toLocaleString();
      let printedPromotion = product.promotion;
      if(product.promotion === null){
        printedPromotion = '재고 없음'
      }
      Console.print(`- ${product.name} ${printedPrice}원 ${product.quantity}개 ${printedPromotion}`);
    });
  },

  askMembership(){
    Console.print('멤버십 할인을 받으시겠습니까? (Y/N)');
  },

  printTotal(total) {
    Console.print(`총 금액: ${total}원`);
  }
};

export default OutputView;