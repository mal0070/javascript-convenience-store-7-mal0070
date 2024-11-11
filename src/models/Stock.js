import { Console, DateTimes } from '@woowacourse/mission-utils';
import fetchData from '../utils/DataGenerator.js';
import FILE_PATHS from '../constants/filePaths.js';
import { InputView } from '../views/InputView.js';

class Stock {
  #products = [];

  constructor(products) {
    this.#products = products;
  }

  getProducts(){
    return this.#products;
  }

  getTargetProducts(name) {
    return this.#products.filter((product) => product.name === name);
  }

  async processOrder(item) {
    const targetProducts = this.getTargetProducts(item.name);
    this.validateProducts(targetProducts, item);

    const regularProduct = targetProducts.find((product) => product.promotion === null);
    const promoProduct = targetProducts.find((product) => product.promotion != null);
    const promotionList = await this.fetchPromoionList();
    const targetPromotion = this.getTargetPromotions(promoProduct,promotionList);

    let totalPrice = 0;
    let restQuantity = item.quantity;
    let freeItems = 0;

    if (promoProduct && this.isInPromotionDate(targetPromotion)) {
      const N = targetPromotion.buy;
      freeItems = Math.floor(item.quantity / N);

      if (item.quantity % N !== 0) {
        const additionalItemsNeeded = N - (item.quantity % N);
        const applyPromotion = await InputView.askAppliedPromotion(item, additionalItemsNeeded);

        if(applyPromotion === 'Y') {
          restQuantity = item.quantity + additionalItemsNeeded;
        }
      }
       //프로모션 적용 수량 계산
      const promoApplicableQuantity = Math.floor(restQuantity / N) * N;

      //프로모션 상품 재고 확인 및 적용
      const availablePromoQuantity = Math.min(freeItems, promoProduct.quantity);
      totalPrice += promoProduct.price * (promoApplicableQuantity - availablePromoQuantity);
      promoProduct.quantity -= availablePromoQuantity;
      restQuantity -= promoApplicableQuantity;

      //부족한 무료 상품을 일반 상품으로 대체
      const restFreeItems = freeItems - availablePromoQuantity;
      if (restFreeItems > 0 && regularProduct) {
        const buySubRegular = await InputView.askBuySubRegular(item.name, restFreeItems);
        if(buySubRegular === 'Y'){
          const subRegular = Math.min(restFreeItems, regularProduct.quantity);
          regularProduct.quantity -= subRegular;
        } 
      }
    }

    if (restQuantity > 0) {
      const deductQuantity = Math.min(regularProduct.quantity, restQuantity);
      totalPrice += regularProduct.price * deductQuantity;
      restQuantity -= deductQuantity;
    }
    
    return { totalPrice, freeItems, restQuantity};
  }

  async getTotalPrice(item){
    const { totalPrice } = await this.processOrder(item);
    return totalPrice;
  }

  async updateStock(item) {
    const { freeItems, restQuantity} = await this.processOrder(item);
    const targetProducts = this.getTargetProducts(item.name);
    const regularProduct = targetProducts.find((product) => product.promotion === null);
    const promoProduct = targetProducts.find((product) => product.promotion != null);

    if (promoProduct) {
      promoProduct.quantity -= Math.min(freeItems, promoProduct.quantity);
    }

    if (regularProduct) {
      regularProduct.quantity -= Math.min(restQuantity, regularProduct.quantity);
    }
  }

  async fetchPromoionList() {
    const promotionList = await fetchData(FILE_PATHS.PROMOTIONS);
    return promotionList;
  }

  getTargetPromotions(product, promotionList) {
    return promotionList.find(
      (promotion) => promotion.name === product.promotion
    );
  }

  isInPromotionDate(targetPromotion) {
    if (
      targetPromotion.startDate <= DateTimes.now() &&
      targetPromotion.endDate >= DateTimes.now()
    ) {
      return true;
    }
  }

  validateProducts(targetProducts, item) {
    if (!targetProducts || targetProducts.length === 0) {
      throw new Error('[ERROR] 존재하지 않는 상품입니다. 다시 입력해 주세요.');
    }
    this.checkQuantities(targetProducts, item);
  }

  checkQuantities(targetProducts, item) {
    let totalQuantities = 0;
    targetProducts.forEach((product) => (totalQuantities += product.quantity));
    if (totalQuantities < item.quantity) {
      throw new Error(
        '[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.'
      );
    }
  }
}

export default Stock;
