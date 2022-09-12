import http from "../../../../shared/utils/http";
import { ConvertBrandModel } from "../models/brand_model";

export class BrandProvider {
  getOne = async (id: string, query: string) => {
    const response = await http.get(`/brands/${id}?${query}`);

    return ConvertBrandModel.toBrandModel(JSON.stringify(response.data));
  };

  update = async (id: string, query: string, data: string) => {
    const response = await http.put(`brands/${id}?${query}`, data);

    return ConvertBrandModel.toBrandModel(JSON.stringify(response.data));
  };

  delete = async (id: string) => {
    await http.delete(`brands/${id}`);
  };
}

const brandProvider = new BrandProvider();
export default brandProvider;
