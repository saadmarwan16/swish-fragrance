import http from "../../../../shared/utils/http";
import { ConvertCategoryModel } from "../models/category_model";

export class CategoryProvider {
  getOne = async (id: string, query: string) => {
    const response = http.get(`/categories/${id}?${query}`);

    return ConvertCategoryModel.toCategoryModel(
      JSON.stringify((await response).data)
    );
  };

  update = async (id: string, data: string) => {};

  delete = async (id: string) => {};
}

const categoryProvider = new CategoryProvider();
export default categoryProvider;
