class ShoppingList {
  #items = new Map(); //name, q 저장. 필드를 작게!

  constructor(input) {
    const parsedInput = this.parseInput(input);
    const validatedInput = this.validateInput(parsedInput);
    this.#items.set(name, validatedInput.name);
    this.#items.set(quantity, validatedInput.quantity);
  }

  parseInput(input) {
    const result = [];
    const items = input.replace(/[\[\]]/g, '').split(','); //["사이다-2", "감자칩-1"] 

    items.forEach(item => {
      const [name, quan] = item.split('-'); //배열 내부 구조분해
      const quantity = parseInt(quan,10);
      result.push({name, quantity});
    });
    
    return result;
  }

  validateInput(input) {
    if (!Stock.has(input.name)) { //이거 고치기.Stock 생성
      
    }
  }
}

export default ShoppingList;
