import getBrandPopulateQuery from "../../../../shared/queries/getBrandPopulateQuery";
import getPaginationQuery from "../../../../shared/queries/getPaginationQuery";
import getSearchQuery from "../../../../shared/queries/getSearchQuery";
import http from "../../../../shared/utils/http";
import { ConvertBrandsModel } from "../models/brands_model";

export class BrandsProvider {
  async getBrands(page: number, searchQuery?: string) {
    if (!searchQuery) {
      const response = await http.get(
        `/brands?${getPaginationQuery(page)}&${getBrandPopulateQuery()}`
      );

      return ConvertBrandsModel.toBrandsModel(JSON.stringify(response.data));
    } else {
      const response = await http.get(
        `/brands?${getSearchQuery(
          page,
          searchQuery
        )}&${getBrandPopulateQuery()}`
      );

      return ConvertBrandsModel.toBrandsModel(JSON.stringify(response.data));
    }
  }

  newBrand = async (data: string) => {
    await http.post("/brands", data);
  };
}

const brandsProvider = new BrandsProvider();
export default brandsProvider;
