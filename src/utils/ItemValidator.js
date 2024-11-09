export default function validateItem(items, stock) {
    for (const item of items) {
      const targetProducts = stock.getProductsByName(item.name);
      if (!targetProducts || targetProducts.length === 0) {
        throw new Error('[ERROR] 존재하지 않는 상품입니다. 다시 입력해 주세요.');
      }

      let totalQuantities = 0;
      targetProducts.forEach((product) => totalQuantities += product.quantity);
      if (totalQuantities < item.quantity) {
        throw new Error('[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.');
      }
    }
    return true;
}