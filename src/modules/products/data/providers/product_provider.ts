import http from "../../../../shared/utils/http";
import { ConvertProductModel } from "../models/product_model";

export class ProductProvider {
  getOne = async (id: string, query: string) => {
    const response = await http.get(`/products/${id}?${query}`);

    return ConvertProductModel.toProductModel(JSON.stringify(response.data));
  };

  update = async (id: string, query: string, data: string) => {
    const response = await http.put(`/products/${id}?${query}`, data);

    return ConvertProductModel.toProductModel(JSON.stringify(response.data));
  };

  delete = async (id: string) => {
    await http.delete(`/products/${id}`);
  };
}

const productProvider = new ProductProvider();
export default productProvider;
