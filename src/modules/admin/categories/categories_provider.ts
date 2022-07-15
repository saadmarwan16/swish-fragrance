import http from "../../../shared/utils/http";
import { ConvertCategoriesModel } from "./categories_model";

export class CategoriesProvider {
  async getCategories() {
    const response = await http.get("/categories?populate=*");

    return ConvertCategoriesModel.toCategoriesModel(
      JSON.stringify(response.data)
    );
  }
}

const categoriesProvider = new CategoriesProvider();
export default categoriesProvider;
