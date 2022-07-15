import { ProductsModel } from "./products_model";
import productsProvider from "./products_provider";

export class ProductsController {
  products: ProductsModel | null = null;

  getProducts = async () => {
    try {
      const products = await productsProvider.getProducts();
      this.products = products;

      return products;
    } catch (e) {
      console.log(e);
    }
  };
}

const productsController = new ProductsController();
export default productsController;
