import http from "../../../../shared/utils/http";
import { ConvertCategoriesModel } from "../models/categories_model";

export class CategoriesProvider {
  create = async (data: string) => {
    await http.post("/categories", data);
  };

  getAll = async (query: string) => {
    const response = await http.get(`/categories?${query}`);

    return ConvertCategoriesModel.toCategoriesModel(
      JSON.stringify(response.data)
    );
  };
}

const categoriesProvider = new CategoriesProvider();
export default categoriesProvider;
