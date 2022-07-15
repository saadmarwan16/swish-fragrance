import http from "../../../shared/utils/http";
import { ConvertProductsModel } from "./products_model";

export class ProductsProvider {
  getProducts = async () => {
    const response = await http.get("/products");

    return ConvertProductsModel.toProductsModel(JSON.stringify(response.data));
  };
}

const productsProvider = new ProductsProvider();
export default productsProvider;
