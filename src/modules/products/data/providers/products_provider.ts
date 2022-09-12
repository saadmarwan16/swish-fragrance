import getPaginationQuery from "../../../../shared/queries/getPaginationQuery";
import getProductPopulateQuery from "../../../../shared/queries/getProductPopulateQuery";
import getSearchQuery from "../../../../shared/queries/getSearchQuery";
import getSortAlphabetical from "../../../../shared/queries/getSortAlphabetical";
import http from "../../../../shared/utils/http";
import { ConvertProductsModel } from "../models/products_model";

export class ProductsProvider {
  newProduct = async (data: string) => {
    await http.post("/products", data);
  };

  getProducts = async (page: number, searchQuery?: string) => {
    if (!searchQuery) {
      const response = await http.get(
        `/products?${getPaginationQuery(
          page
        )}&${getProductPopulateQuery()}&${getSortAlphabetical()}`
      );

      return ConvertProductsModel.toProductsModel(
        JSON.stringify(response.data)
      );
    } else {
      const response = await http.get(
        `/products?${getSearchQuery(
          searchQuery
        )}&${getProductPopulateQuery()}&${getPaginationQuery(page)}`
      );

      return ConvertProductsModel.toProductsModel(
        JSON.stringify(response.data)
      );
    }
  };
}

const productsProvider = new ProductsProvider();
export default productsProvider;
