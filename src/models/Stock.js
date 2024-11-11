import { Console, DateTimes } from '@woowacourse/mission-utils';
import fetchData from '../utils/DataGenerator.js';
import FILE_PATHS from '../constants/filePaths.js';
import { InputView } from '../views/InputView.js';

class Stock {
  #products = [];

  constructor(products) {
    this.#products = products;
  }

  getProducts() {
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

    const { totalPrice, freeItems, restQuantity } = await this.applyPromotion(item,regularProduct,promoProduct);

    return { totalPrice, freeItems, restQuantity };
  }

  async applyPromotion(item, regularProduct, promoProduct) {
    let totalPrice = 0;
    let restQuantity = item.quantity;
    let freeItems = 0;

    if (promoProduct && (await this.isValidPromotion(promoProduct))) {
      const promotionResult = await this.calculatePromotionResult(item,promoProduct);
      totalPrice += promotionResult.price;
      freeItems = promotionResult.freeItems;
      restQuantity = promotionResult.restQuantity;
    }

    if (restQuantity > 0 && regularProduct) {
      const regularResult = this.calculateRegularResult(restQuantity,regularProduct);
      totalPrice += regularResult.price;
      restQuantity = regularResult.restQuantity;
    }

    return { totalPrice, freeItems, restQuantity };
  }

  async isValidPromotion(promoProduct) {
    const promotionList = await this.fetchPromoionList();
    const targetPromotion = this.getTargetPromotions(promoProduct,promotionList);
    return this.isInPromotionDate(targetPromotion);
  }

  async calculatePromotionResult(item, promoProduct) {
    const promotionList = await this.fetchPromoionList();
    const targetPromotion = this.getTargetPromotions(promoProduct,promotionList);
    const N = targetPromotion.buy;
    const freeItems = Math.floor(item.quantity / N);
    let restQuantity = item.quantity;
    let price = 0;

    if (item.quantity % N !== 0) {
      const additionalItemsNeeded = N - (item.quantity % N);
      const applyPromotion = await InputView.askAppliedPromotion(item,additionalItemsNeeded);
      if (applyPromotion === 'Y') {
        restQuantity += additionalItemsNeeded;
      }
    }

    const promoApplicableQuantity = Math.floor(restQuantity / N) * N;
    const availablePromoQuantity = Math.min(freeItems, promoProduct.quantity);
    price = promoProduct.price * (promoApplicableQuantity - availablePromoQuantity);
    restQuantity -= promoApplicableQuantity;

    return { price, freeItems, restQuantity };
  }

  calculateRegularResult(quantity, regularProduct) {
    const deductQuantity = Math.min(regularProduct.quantity, quantity);
    const price = regularProduct.price * deductQuantity;
    const restQuantity = quantity - deductQuantity;
    return { price, restQuantity };
  }

  async updateStock(item) {
    const { freeItems, restQuantity } = await this.processOrder(item);
    const targetProducts = this.getTargetProducts(item.name);
    const regularProduct = targetProducts.find((product) => product.promotion === null);
    const promoProduct = targetProducts.find((product) => product.promotion != null);

    if (promoProduct) {
      promoProduct.quantity -= Math.min(freeItems, promoProduct.quantity);
    }

    if (regularProduct) {
      regularProduct.quantity -= Math.min(
        restQuantity,
        regularProduct.quantity
      );
    }
  }
  async getTotalPrice(item) {
    const { totalPrice } = await this.processOrder(item);
    return totalPrice;
  }

  async fetchPromoionList() {
    const promotionList = await fetchData(FILE_PATHS.PROMOTIONS);
    return promotionList;
  }

  getTargetPromotions(product, promotionList) {
    return promotionList.find((promotion) => promotion.name === product.promotion);
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
