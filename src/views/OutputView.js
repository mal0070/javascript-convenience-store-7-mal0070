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
  
  printRecipt(totalPrice, promoDiscount, membershipDiscount, money){
    Console.print(`
      총구매액: ${totalPrice}
      행사할인: ${promoDiscount}
      멤버십할인: ${membershipDiscount}
      내실돈: ${money}`)
  }
};

export default OutputView;