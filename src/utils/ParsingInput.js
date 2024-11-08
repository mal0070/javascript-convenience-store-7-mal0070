export default function parseInput(input) {
    const result = [];
    const items = input.replace(/[\[\]]/g, '').split(','); //["사이다-2", "감자칩-1"] 
  
    items.forEach(item => {
      const [name, quan] = item.split('-'); //배열 내부 구조분해
      const quantity = parseInt(quan,10);
      result.push({name, quantity});
    });
    
    return result;
  }