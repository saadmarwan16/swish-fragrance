import getPaginationQuery from "../../../shared/queries/getPaginationQuery";
import getSearchQuery from "../../../shared/queries/getSearchQuery";
import http from "../../../shared/utils/http";
import { ConvertBrandsModel } from "./brands_model";

export class BrandsProvider {
  async getBrands(page: number, searchQuery?: string) {
    if (!searchQuery) {
      const response = await http.get(
        `/brands?${getPaginationQuery(page)}&populate=*`
      );

      return ConvertBrandsModel.toBrandsModel(JSON.stringify(response.data));
    } else {
      const response = await http.get(
        `/brands?${getSearchQuery(page, searchQuery)}&populate=*`
      );

      return ConvertBrandsModel.toBrandsModel(JSON.stringify(response.data));
    }
  }
}

const brandsProvider = new BrandsProvider();
export default brandsProvider;
