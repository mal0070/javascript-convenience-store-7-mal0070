//재고 상황
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

  updateStock(item) {
    const targetProducts = this.getTargetProducts(item.name);

    if (!targetProducts || targetProducts.length === 0) {
      throw new Error('[ERROR] 존재하지 않는 상품입니다. 다시 입력해 주세요.');
    }

    this.checkQuantities(targetProducts, item);

    if (targetProducts.length === 2) {
      //프로모션 상품선택
    }

    targetProducts[0].quantity -= item.quantity;
    return (targetProducts[0].price)*item.quantity;
  }

  checkQuantities(targetProducts, item) {
    let totalQuantities = 0;
    targetProducts.forEach((product) => (totalQuantities += product.quantity));
    if (totalQuantities < item.quantity) {
      throw new Error('[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.');
    }
  }
}

export default Stock;
