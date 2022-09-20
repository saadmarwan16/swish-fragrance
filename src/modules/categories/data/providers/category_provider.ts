import http from "../../../../shared/utils/http";
import { ConvertCategoryModel } from "../models/category_model";

export class CategoryProvider {
  getOne = async (id: string, query: string) => {
    const response = http.get(`/get-category-edit/${id}?${query}`);

    return ConvertCategoryModel.toCategoryModel(
      JSON.stringify((await response).data)
    );
  };

  update = async (id: string, query: string, data: string) => {
    const response = await http.put(`categories/${id}?${query}`, data);

    return ConvertCategoryModel.toCategoryModel(JSON.stringify(response.data));
  };

  delete = async (id: string) => {
    await http.delete(`categories/${id}`);
  };
}

const categoryProvider = new CategoryProvider();
export default categoryProvider;
