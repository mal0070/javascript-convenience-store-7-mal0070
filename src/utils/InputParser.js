export default function parseInput(input) {
  const items = input.replace(/[\[\]]/g, '').split(','); //["사이다-2", "감자칩-1"]

  if(items.length === 0){
    throw new Error("[ERROR] 올바르지 않은 형식으로 입력했습니다. 다시 입력해 주세요.");
  }
return items.map(parseItem);
}

function parseItem(item) {
  const [name, quan] = item.trim().split('-');
  if(!name || !quan){
    throw new Error("[ERROR] 올바르지 않은 형식으로 입력했습니다. 다시 입력해 주세요.");
  }
  const quantity = parseInt(quan, 10);
  if(isNaN(quantity)){
    throw new Error("[ERROR] 잘못된 입력입니다. 다시 입력해주세요.");
  }
  return { name: name, quantity: quantity };
}