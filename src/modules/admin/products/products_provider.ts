import getPaginationQuery from "../../../shared/queries/getPaginationQuery";
import getProductPopulateQuery from "../../../shared/queries/getProductPopulateQuery";
import getSearchQuery from "../../../shared/queries/getSearchQuery";
import http from "../../../shared/utils/http";
import { ConvertProductsModel } from "./products_model";

export class ProductsProvider {
  getProducts = async (page: number, searchQuery?: string) => {
    if (!searchQuery) {
      const response = await http.get(
        `/products?${getPaginationQuery(page)}&${getProductPopulateQuery()}`
      );

      return ConvertProductsModel.toProductsModel(
        JSON.stringify(response.data)
      );
    } else {
      const response = await http.get(
        `/products?${getSearchQuery(
          page,
          searchQuery
        )}&${getProductPopulateQuery()}`
      );

      return ConvertProductsModel.toProductsModel(
        JSON.stringify(response.data)
      );
    }
  };
}

const productsProvider = new ProductsProvider();
export default productsProvider;
