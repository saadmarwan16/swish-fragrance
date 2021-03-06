import getCategoryPopulateQuery from "../../../shared/queries/getCategoryPopulateQuery";
import getPaginationQuery from "../../../shared/queries/getPaginationQuery";
import getSearchQuery from "../../../shared/queries/getSearchQuery";
import http from "../../../shared/utils/http";
import { ConvertCategoriesModel } from "./categories_model";
import { ConvertCategoryModel } from "./category_model";

export class CategoriesProvider {
  newCategory = async (name: string) => {
    await http.post("/categories", {
      data: {
        name,
      },
    });
  };

  updateCategory = async (id: number, name: string) => {
    await http.put(`/categories/${id}`, {
      data: {
        name,
      },
    });
  };

  getCategory = async (id: string) => {
    const response = await http.get(
      `/categories/${id}?${getCategoryPopulateQuery()}`
    );

    return ConvertCategoryModel.toCategoryModel(JSON.stringify(response.data));
  };

  async getCategories(page: number, searchQuery?: string) {
    if (!searchQuery) {
      const response = await http.get(
        `/categories?${getPaginationQuery(page)}&${getCategoryPopulateQuery()}`
      );

      return ConvertCategoriesModel.toCategoriesModel(
        JSON.stringify(response.data)
      );
    } else {
      const response = await http.get(
        `/categories?${getSearchQuery(
          page,
          searchQuery
        )}&${getCategoryPopulateQuery()}`
      );

      return ConvertCategoriesModel.toCategoriesModel(
        JSON.stringify(response.data)
      );
    }
  }
}

const categoriesProvider = new CategoriesProvider();
export default categoriesProvider;
