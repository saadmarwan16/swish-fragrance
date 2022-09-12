import http from "../../../../shared/utils/http";
import { ConvertBrandsModel } from "../models/brands_model";

export class BrandsProvider {
  create = async (data: string) => {
    await http.post("/brands", data);
  };

  getMany = async (query: string) => {
    const response = await http.get(`/brands?${query}`);

    return ConvertBrandsModel.toBrandsModel(JSON.stringify(response.data));
  };

  getAll = async (query: string) => {
    const response = await http.get(`/brands?${query}`);

    return ConvertBrandsModel.toBrandsModel(JSON.stringify(response.data));
  };
}

const brandsProvider = new BrandsProvider();
export default brandsProvider;
