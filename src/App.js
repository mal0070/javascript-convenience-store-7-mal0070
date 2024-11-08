import ShoppingController from "./controllers/ShoppingController.js";

class App {
  async run() {
    const shoppingController = new ShoppingController();
    await shoppingController.run();
  }
}

export default App;
