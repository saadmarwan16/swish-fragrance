import http from "../../../../shared/utils/http";
import { ConvertProductsModel } from "../models/products_model";

export class ProductsProvider {
  create = async (data: string) => {
    await http.post("/products", data);
  };

  getMany = async (query: string) => {
    const response = await http.get(`/products?${query}`);

    return ConvertProductsModel.toProductsModel(JSON.stringify(response.data));
  };

  getAll = async (query: string) => {
    const response = await http.get(`/products?${query}`);

    return ConvertProductsModel.toProductsModel(JSON.stringify(response.data));
  };
}

const productsProvider = new ProductsProvider();
export default productsProvider;
